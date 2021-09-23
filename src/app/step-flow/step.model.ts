import { Type } from '@angular/core';
import { StepEnum } from './step.enum';
import { StepLayoutOptionsInterface } from './step-layout-options.interface';
import { Observable } from 'rxjs';
import { StepAnalyticsOptions } from './interfaces/step-analytics-options.interface';

export class Step {
    key: string;
    type: StepEnum = StepEnum.DEFAULT;
    template: Type<any>;
    titleParameterValue: Observable<string>;
    component: { selector: any };

    withNextButton: boolean;
    nextButtonLabel = 'btn.steps.next';
  // tslint:disable-next-line:ban-types
    nextButtonCallback: Function;
  // tslint:disable-next-line:ban-types
    prevButtonCallback: Function;
    previousStepDisabled: boolean;
    asAlternativeFirstStep: boolean;
    image: string;
    imageMobile: string;
    isImageScrollable: boolean;
    isEnabled = true;
    isCompleted = false;
    layoutOptions: StepLayoutOptionsInterface = undefined;
    overwriteFlowLabel: string = undefined;
    chosenProduct$: Observable<any> = undefined;
    order: number;

    analyticsOptions?: StepAnalyticsOptions;

    constructor(key: string) {
        this.key = key;
        this.withNextButton = true;
    }

    public isFinal(): boolean {
        return this.type === StepEnum.FINAL;
    }

    public setCompleted(completedState: boolean) {
        this.isCompleted = completedState;
    }

    public isConfirm() {
        return this.type === StepEnum.CONFIRM;
    }
}
