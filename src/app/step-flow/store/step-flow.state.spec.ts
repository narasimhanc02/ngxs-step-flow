import { configureTestSuite } from 'ng-bullet';
// import { cleanStylesFromDom } from '@tg-shared/common/utils/clean-style-tags.util';
import { async, TestBed } from '@angular/core/testing';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { StepFlowState, StepFlowStateModel } from './step-flow.state';
import { Observable } from 'rxjs';
import { SetStepsAction } from './step-flow.actions';
import { StepBuilder } from '../step.builder';


describe('StepStore store', () => {
    let store: Store;
    let actions$: Observable<any>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([StepFlowState])]
        });

        store = TestBed.inject(Store);
        actions$ = TestBed.inject(Actions);
    });

    describe('SetStepsAction', () => {
        it('should add steps to the current store and set the first step to be the current step', async(() => {
            const step = StepBuilder.aStep('first-step').build();
            const step2 = StepBuilder.aStep('second-step').build();
            store.dispatch([new SetStepsAction([step, step2])]);

            store.selectOnce(StepFlowState).subscribe((state: StepFlowStateModel) => {
                expect(state.steps.length).toBe(2);
                expect(state.currentStep).toBe(step);
            });
        }));
    });

    describe('goToNextStepAction', () => {
        beforeEach(async(() => {
            const step = StepBuilder.aStep('first-step').build();
            const step2 = StepBuilder.aStep('second-step').build();
            const step3 = StepBuilder.aStep('second-step').build();
            store.dispatch([new SetStepsAction([step, step2, step3])]);
        }));

        it('should throw an error when this action is called and the current step is an active step', async(() => {
            const step = StepBuilder.aStep('first-step').build();
            const step2 = StepBuilder.aStep('second-step').build();
            store.dispatch([new SetStepsAction([step, step2])]);

            store.selectOnce(StepFlowState).subscribe((state: StepFlowStateModel) => {
                expect(state.steps.length).toBe(2);
                expect(state.currentStep).toBe(step);
            });
        }));
    });

    afterEach(() => {
        // cleanStylesFromDom();
    });
});
