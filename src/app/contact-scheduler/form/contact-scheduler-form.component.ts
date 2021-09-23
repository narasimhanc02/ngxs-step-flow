import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {AbstractBaseComponent} from '../../shared/abstract-base.component';
import {ContactSchedulerActions} from '../store/contact-scheduler.actions';
import {ContactSchedulerFormModel} from '../models/contact-scheduler-form.model';
import {StepFlowState} from '../../step-flow/store/step-flow.state';

@Component({
    selector: 'tg-contact-scheduler-form',
    templateUrl: './contact-scheduler-form.component.html'
})
export class ContactSchedulerFormComponent extends AbstractBaseComponent implements OnInit, OnDestroy {
    form: FormGroup;

    constructor(private store: Store,
                private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.obs(this.store.select(StepFlowState.currentStep))
            .subscribe((currentStep: { nextButtonCallback: () => Observable<boolean>; }) => {
                currentStep.nextButtonCallback = this.onSubmit.bind(this);
        });
        this.initForm();
    }

    onSubmit(): Observable<boolean> {
        if (this.form.valid) {
          return this.submitHandler();
        } else {
            this.form.markAllAsTouched();
            return of(false);
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(4)]],
            lastName: ['', [Validators.required]],
            emailId: ['', [Validators.required, Validators.email]]
        });
    }

    private submitHandler(): Observable<boolean> {
        const formData = new ContactSchedulerFormModel();
        formData.firstName = this.firstName.value;
        formData.lastName = this.lastName.value;
        formData.emailId = this.emailId.value;
        formData.responseStatus = 'success';

        return this.store.dispatch(new ContactSchedulerActions.SubmitFormData(formData));
    }

    get firstName() { return this.form.get('firstName')!; }
    get lastName() { return this.form.get('lastName')!; }
    get emailId() { return this.form.get('emailId')!; }

    onDestroy(): void {}
}
