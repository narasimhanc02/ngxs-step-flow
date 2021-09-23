import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Step } from '../step.model';
import { NavigationBarNextLabelEnum } from './navigation-bar-next-label.enum';
import { tap } from 'rxjs/operators';
import {AbstractBaseComponent} from '../../shared/abstract-base.component';
import {StepFlowState} from '../store/step-flow.state';
import {StepFlowUtil} from '../store/step-flow.util';
import {GoToNextStepAction, GoToPreviousStepAction} from '../store/step-flow.actions';


@Component({
    selector: 'app-step-navigation-bar',
    templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent extends AbstractBaseComponent implements OnInit {
    @Input() dynamicShadow: boolean;
    @Input() showStepCounter: boolean;
    @Input() showStepProgressBar: boolean;
    @Input() styling: 'default' | 'buttons' = 'default';
    @Input() buttonTextOverride: string;
    currentStep: Step;
    isConfirmiationStep: boolean;
    stepCount: number;
    currentStepNumber: number;
    progressPercentage: string;
    hasNextStep = false;
    hasPreviousStep = false;
    previousStepDisabled = false;
    isLoading = false;
    nextStepLabel: NavigationBarNextLabelEnum = NavigationBarNextLabelEnum.START;
    alternativeFirstStep = false;
    buttoneTypeOverride: NavigationBarNextLabelEnum;

    constructor(
        private store: Store) {
        super();
    }

    ngOnInit() {
        this.obs(this.store.select(StepFlowState.currentStep)).pipe(
            tap((currentStep: Step) => {
                if (currentStep) {
                    this.alternativeFirstStep = currentStep.asAlternativeFirstStep;
                }
            })).subscribe((currentStep: Step) => {
            this.currentStep = currentStep;
            if (!currentStep) {
                throw Error('Could not initialise stepper navigation bar');
            }
            this.isConfirmiationStep = currentStep.isConfirm();
            const steps = this.store.selectSnapshot(StepFlowState.steps);
            this.stepCount = StepFlowUtil.getStepCount(steps);
            this.currentStepNumber = StepFlowUtil.getStepIndex(currentStep, steps) + 1;
            this.hasNextStep = StepFlowUtil.hasNextStep(currentStep, steps);
            this.hasPreviousStep = StepFlowUtil.hasPreviousStep(currentStep, steps);
            this.previousStepDisabled = currentStep.previousStepDisabled;
            this.nextStepLabel = this.getNextLabel();
            this.progressPercentage = this.calculateProgress();
        });

    }

    goToNextStep(): void {
        if (!this.isLoading) {
            if (this.currentStep.nextButtonCallback) {
                this.currentStep.nextButtonCallback()
                    .subscribe((response: any) => {
                        if (response) {
                            this.store.dispatch(new GoToNextStepAction());
                        }
                    });
            } else {
                this.store.dispatch(new GoToNextStepAction());
            }
        }
    }

    private calculateProgress(): string {
        return ((this.currentStepNumber / this.stepCount) * 100).toFixed(0);
    }

    getNextLabel(): NavigationBarNextLabelEnum {
        if (this.buttoneTypeOverride) {
            return this.buttoneTypeOverride;
        } else if (this.isCurrentStepAlternativeFirstStep() || this.currentStep.isConfirm()) {
            return NavigationBarNextLabelEnum.CONFIRM;
        } else if (this.isCurrentStepFirstStep()) {
            return NavigationBarNextLabelEnum.START;
        } else if (this.currentStep.isFinal()) {
            return NavigationBarNextLabelEnum.FINAL;
        } else {
            return NavigationBarNextLabelEnum.NEXT;
        }
    }

    private isCurrentStepFirstStep() {
        return this.currentStepNumber === 1;
    }

    goToPreviousStep(): void {
        if (this.currentStep.prevButtonCallback) {
            this.currentStep.prevButtonCallback()
                .subscribe((response: any) => {
                    if (response) {
                        this.store.dispatch(new GoToPreviousStepAction());
                    }
                });
        } else {
            this.store.dispatch(new GoToPreviousStepAction());
        }
    }

    isCurrentStepAlternativeFirstStep(): boolean {
        return this.isCurrentStepFirstStep() && this.alternativeFirstStep;
    }

    onDestroy(): void {
    }
}
