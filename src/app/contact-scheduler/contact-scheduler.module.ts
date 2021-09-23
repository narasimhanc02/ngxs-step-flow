import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxsModule} from '@ngxs/store';
import {StepFlowState} from '../step-flow/store/step-flow.state';
import {ContactSchedulerState} from './store/contact-scheduler.state';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactSchedulerComponent} from './contact-scheduler.component';
import {ContactSchedulerConfirmationComponent} from './confirmation/contact-scheduler-confirmation.component';
import {ContactSchedulerFormComponent} from './form/contact-scheduler-form.component';
import {StepFlowModule} from '../step-flow/step-flow.module';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature(
      [
        StepFlowState,
        ContactSchedulerState
      ]
    ),
    ReactiveFormsModule,
    StepFlowModule
  ],
    declarations: [
        ContactSchedulerComponent,
        ContactSchedulerConfirmationComponent,
        ContactSchedulerFormComponent
    ],
    exports: [
        ContactSchedulerComponent
    ],
    entryComponents: [
        ContactSchedulerComponent
    ],
    providers: []
})
export class ContactSchedulerModule {
}
