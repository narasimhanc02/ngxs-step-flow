import { Store } from '@ngxs/store';
import {AfterViewInit, Component, ComponentFactoryResolver, Injectable, OnInit, Renderer2, ViewChild} from '@angular/core';
import { StepInterface } from '../step.interface';
import { StepHostDirective } from '../directives/step-host.directive';
import {Step} from '../../step.model';
import {LabelUtil} from '../../../shared/utils/label.util';

@Component({
  template: ''
})
// tslint:disable-next-line:component-class-suffix
export abstract class AbstractStep implements StepInterface, AfterViewInit {
    store: Store;
    currentStep: Step;
    messageGroup: string;
    bundleName: string;
    @ViewChild(StepHostDirective, {static: true}) stepHost: StepHostDirective;

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentStep.component.selector);
        const componentRef = this.stepHost.viewContainerRef.createComponent(componentFactory);
        if (this.currentStep.layoutOptions && this.currentStep.layoutOptions.wrapperClasses) {
            this.currentStep.layoutOptions.wrapperClasses.forEach((wrapperClass) => {
                this.renderer.addClass(componentRef.location.nativeElement, wrapperClass);
            });
        }
        componentRef.changeDetectorRef.detectChanges();
    }

    getHeader(): string {
        return LabelUtil.getLabelKeyWithTypeTitle(this.messageGroup + '.steps.' + this.currentStep.key + '-header');
    }

    getFlowName(): string {
        return this.currentStep.overwriteFlowLabel !== undefined ?
            LabelUtil.getLabelKeyWithTypeTitle(this.currentStep.overwriteFlowLabel) :
            LabelUtil.getLabelKeyWithTypeTitle(this.messageGroup + '.steps');
    }

    getContainerId() {
        return this.currentStep.layoutOptions ? this.currentStep.layoutOptions.contentId : undefined;
    }
}
