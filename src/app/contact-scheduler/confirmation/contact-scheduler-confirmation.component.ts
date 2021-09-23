import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {AbstractBaseComponent} from '../../shared/abstract-base.component';
import {ContactSchedulerFormModel} from '../models/contact-scheduler-form.model';
import {Step} from '../../step-flow/step.model';
import {StepFlowState} from '../../step-flow/store/step-flow.state';
import {ContactSchedulerState} from '../store/contact-scheduler.state';
import {GoToPreviousStepAction} from '../../step-flow/store/step-flow.actions';


@Component({
    selector: 'tg-contact-scheduler-confirmation',
    templateUrl: './contact-scheduler-confirmation.component.html'
})
export class ContactSchedulerConfirmationComponent extends AbstractBaseComponent implements OnInit, OnDestroy {
    contactSchedulerModel: ContactSchedulerFormModel;
    currentStep: Step;

    constructor(private store: Store) {
        super();
    }

    ngOnInit(): void {
        this.obs(this.store.select(StepFlowState.currentStep))
        .subscribe((currentStep: any) => {
            this.currentStep = currentStep;
            this.currentStep.prevButtonCallback = this.goToPreviousStep.bind(this);
        });

        this.obs(this.store.select(ContactSchedulerState.contactSchedulerFormData))
        .subscribe((formData: any) => {
            this.contactSchedulerModel = formData;
            console.log('this.contactSchedulerModel', this.contactSchedulerModel);
        });
    }


    goToPreviousStep(): void {
        this.store.dispatch(new GoToPreviousStepAction());
    }


    onDestroy(): void {}
}
