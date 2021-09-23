import {
    Component, Input,
    OnInit
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Step} from '../step-flow/step.model';
import {StepFlowState} from '../step-flow/store/step-flow.state';
import {StepBuilder} from '../step-flow/step.builder';
import {ContactSchedulerStep} from './constants/contact-scheduler.step';
import {ContactSchedulerFormComponent} from './form/contact-scheduler-form.component';
import {ContactSchedulerConfirmationComponent} from './confirmation/contact-scheduler-confirmation.component';
import {SetStepsAction} from '../step-flow/store/step-flow.actions';
import {AbstractBaseComponent} from '../shared/abstract-base.component';


@Component({
    selector: 'app-contact-scheduler',
    templateUrl: './contact-scheduler.component.html'
})
export class ContactSchedulerComponent extends AbstractBaseComponent implements OnInit {

    isCurrentStepFinal: Observable<boolean>;
    steps: Step[] = [];

    constructor(
        private store: Store
    ) {
        super();
    }

    onDestroy(): void {}

    ngOnInit(): void {
        this.isCurrentStepFinal = this.store.select(StepFlowState.currentStep).pipe(
            map((currentStep: Step) => currentStep.isFinal())
        );

        this.addSteps();
        this.dispatchActions();
    }

    private addSteps(): void {
        this.steps.push(StepBuilder.anEmptyStep(ContactSchedulerStep.FORM)
            .withComponent(ContactSchedulerFormComponent)
            .build());

        this.steps.push(StepBuilder.anEmptyStep(ContactSchedulerStep.CONFIRMATION)
            .withComponent(ContactSchedulerConfirmationComponent)
            .withFinalState()
            .withPreviousStepDisabled()
            .build());
    }

    private dispatchActions(): void {
        this.store.dispatch([
            new SetStepsAction(this.steps)
        ]);
    }
}
