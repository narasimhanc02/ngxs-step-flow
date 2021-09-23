import { Step } from './step.model';
import { StepEnum } from './step.enum';
import { EmptyComponent } from './step-container/views/empty/empty.component';
import { StepLayoutOptionsInterface } from './step-layout-options.interface';
import { DefaultComponent } from './step-container/views/default/default.component';
import { Observable } from 'rxjs';
import { TwoColumnsNoImageComponent } from './step-container/views/two-columns-no-image/two-columns-no-image.component';
import { StepAnalyticsOptions } from './interfaces/step-analytics-options.interface';

export class StepBuilder {
  // tslint:disable-next-line:variable-name
    private readonly _step: Step;

    private constructor(key: string) {
        this._step = new Step(key);
    }

    static aStep(key: string, layoutOptions?: StepLayoutOptionsInterface): StepBuilder {
        const stepBuilder = new StepBuilder(key);
        stepBuilder._step.template = DefaultComponent;
        if (layoutOptions) {
            stepBuilder._step.layoutOptions = layoutOptions;
        }
        return stepBuilder;
    }

    static aStepWithNoImageAndHeader(key: string,
                                     layoutOptions?: StepLayoutOptionsInterface,
                                     analyticsOptions?: StepAnalyticsOptions): StepBuilder {
        const stepBuilder = new StepBuilder(key);
        stepBuilder._step.template = TwoColumnsNoImageComponent;
        if (layoutOptions) {
            stepBuilder._step.layoutOptions = layoutOptions;
        }
        if (analyticsOptions) {
            stepBuilder._step.analyticsOptions = analyticsOptions;
        }
        return stepBuilder;
    }

    static anEmptyStep(key: string): StepBuilder {
        const stepBuilder = new StepBuilder(key);
        stepBuilder._step.template = EmptyComponent;

        return stepBuilder;
    }

    public withComponent(selector: any): StepBuilder {
        this._step.component = {selector};
        return this;
    }

    public withOrder(order: number): StepBuilder {
        this._step.order = order;
        return this;
    }

    public withEnabledState(state = true): StepBuilder {
        this._step.isEnabled = state;
        return this;
    }

    public withCompletedState(state = true): StepBuilder {
        this._step.setCompleted(state);
        return this;
    }

    public withPreviousStepDisabled(state = false): StepBuilder {
        this._step.previousStepDisabled = state;
        return this;
    }

    public withFinalState(): StepBuilder {
        this._step.type = StepEnum.FINAL;
        return this;
    }

    public withConfirmState(): StepBuilder {
        this._step.type = StepEnum.CONFIRM;
        return this;
    }

    public withOverwriteFlowLabel(flowLabel: string): StepBuilder {
        this._step.overwriteFlowLabel = flowLabel;
        return this;
    }

    public withTitleParameterValue(value: Observable<any>): StepBuilder {
        this._step.titleParameterValue = value;
        return this;
    }

    public withChosenProductValue(value: Observable<any>): StepBuilder {
        this._step.chosenProduct$ = value;
        return this;
    }

    public withMobileImage(value: string): StepBuilder {
        this._step.imageMobile = value;
        return this;
    }

    public withScrollableImage(scrollable = true): StepBuilder {
        this._step.isImageScrollable = scrollable;
        return this;
    }

    public withAsAlternativeFirstStep(): StepBuilder {
        this._step.asAlternativeFirstStep = true;
        return this;
    }

    public build(): Step {
        return this._step;
    }
}
