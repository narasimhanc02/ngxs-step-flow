import { Store } from '@ngxs/store';
import { StepInterface } from './step.interface';
import { StepContainerDirective } from './step-container.directive';
import { Component, ComponentFactoryResolver, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { StepFlowState } from '../store/step-flow.state';
import { StepFlowUtil } from '../store/step-flow.util';
import { Step } from '../step.model';
import { StepFlowAnalyticsConfig } from '../interfaces/step-flow-analytics-config.interface';
import {AbstractBaseComponent} from '../../shared/abstract-base.component';

@Component({
    selector: 'app-step-container',
    templateUrl: 'step-container.component.html'
})
export class StepContainerComponent extends AbstractBaseComponent implements OnInit {

    @Input() stepFlowAnalyticsConfig: StepFlowAnalyticsConfig;

    @ViewChild(StepContainerDirective, {static: true}) stepContainer: StepContainerDirective;
    previousStep: Step;
    stepNavigationEndTime: number;

    constructor(
        private store: Store,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
        super();
    }

    ngOnInit(): void {
        this.obs(this.store.select(StepFlowState.currentStep))
            .subscribe(currentStep => {
                if (currentStep) {
                    this.stepNavigationEndTime = new Date().getTime();
                    this.reportStepLoadTime(currentStep);
                    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(currentStep.template);
                    const viewContainerRef = this.stepContainer.viewContainerRef;
                    viewContainerRef.clear();
                    const componentRef = viewContainerRef.createComponent(componentFactory);
                    (componentRef.instance as StepInterface).store = this.store;
                    (componentRef.instance as StepInterface).currentStep = currentStep;
                }
            });
    }

    private reportStepLoadTime(currentStep: Step) {
        const reportStepLoadTiming = this.store.selectSnapshot(StepFlowState.reportStepLoadTiming);

        if (reportStepLoadTiming) {
            const steps: Step[] = this.store.selectSnapshot(StepFlowState.steps);

            const currentStepIndex = StepFlowUtil.getStepIndex(currentStep, steps);
            const previousStepIndex = this.previousStep ? StepFlowUtil.getStepIndex(this.previousStep, steps) : 0;
            if ((currentStepIndex - previousStepIndex) >= 0) {
                this.delayStepLoadTime();
            }
            this.previousStep = currentStep;
        }
    }

    private delayStepLoadTime() {
        setTimeout((stepNavigationEndTime: any) => {
            const lastStepNavigationEndTime = stepNavigationEndTime;

            if (lastStepNavigationEndTime === this.stepNavigationEndTime && this.stepNavigationEndTime !== 0) {
                this.fireStepLoadTimeEvent();
            } else {
                this.delayStepLoadTime();
            }
        }, 10, this.stepNavigationEndTime);
    }

    private fireStepLoadTimeEvent() {
        const stepNavigationStartTime: number = this.store.selectSnapshot(StepFlowState.stepNavigationStartTime);

        const attributes: any = {
            itemName: stepNavigationStartTime > 0 ?
                (((this.stepNavigationEndTime - stepNavigationStartTime) / 1000).toFixed(2)).toString() :
                // @ts-ignore
                (((this.stepNavigationEndTime - window.performance.timing.navigationStart) / 1000).toFixed(2)).toString()
        };
        console.log('Reporting attributes', attributes);
    }

    onDestroy(): void {
    }
}
