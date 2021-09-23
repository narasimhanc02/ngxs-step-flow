import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { catchError, mergeMap } from 'rxjs/operators';
import produce from 'immer';
import {ContactSchedulerFormModel} from '../models/contact-scheduler-form.model';
import {Observable, of} from 'rxjs';
import {ContactSchedulerActions} from './contact-scheduler.actions';

export interface ContactSchedulerStateModel {
    formData: ContactSchedulerFormModel;
    isLoaderShown: boolean;
}

const initialData = {
    firstName: null,
    lastName: null,
    emailId: null
} as ContactSchedulerFormModel;

@State<ContactSchedulerStateModel>({
    name: 'contactScheduler',
    defaults: {
        formData: initialData,
        isLoaderShown: true
    }
})
@Injectable()
export class ContactSchedulerState {
    constructor() {}

    @Selector()
    public static contactSchedulerFormData(state: ContactSchedulerStateModel): ContactSchedulerFormModel {
        return state.formData;
    }

    @Action(ContactSchedulerActions.ShowLoader)
    showLoader(ctx: StateContext<ContactSchedulerStateModel>): void {
        ctx.setState(
            produce(ctx.getState(), (draft: ContactSchedulerStateModel) => {
                draft.isLoaderShown = true;
            }),
        );
    }

    @Action(ContactSchedulerActions.HideLoader)
    hideLoader(ctx: StateContext<ContactSchedulerStateModel>): void {
        ctx.setState(
            produce(ctx.getState(), (draft: ContactSchedulerStateModel) => {
                draft.isLoaderShown = false;
            }),
        );
    }

    @Action(ContactSchedulerActions.SubmitFormData)
    submitData(ctx: StateContext<ContactSchedulerStateModel>, action: ContactSchedulerActions.SubmitFormData): Observable<boolean> {
        return ctx.dispatch(new ContactSchedulerActions.ShowLoader()).pipe(
            mergeMap(() => {
              ctx.setState(
                produce(ctx.getState(), (draft: ContactSchedulerStateModel) => {
                  draft.formData = action.formData;
                })
              );
              return of(true);
            }),
            mergeMap(() => {
                ctx.dispatch(new ContactSchedulerActions.HideLoader());
                return of(true);
            }),
            catchError(() => {
                ctx.dispatch(new ContactSchedulerActions.HideLoader());
                ctx.setState(produce(ctx.getState(), (draft: ContactSchedulerStateModel) => {
                    draft.formData.isError = true;
                }));
                return of(true);
            })
        );
    }

    @Action(ContactSchedulerActions.ClearFormData)
    clearContactSchedulerData(ctx: StateContext<ContactSchedulerStateModel>): void {
        ctx.setState(
            produce(ctx.getState(), (draft: ContactSchedulerStateModel) => {
                draft.formData = initialData;
            }),
        );
    }

}
