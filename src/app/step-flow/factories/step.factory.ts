import { StepFlowConfig } from '../interfaces/step-flow-config.interface';
import { Step } from '../step.model';
import { StepConfig } from '../interfaces/step-config.interface';
import { StepBuilder } from '../step.builder';
import { instanceOfStepDecision, StepDecision } from '../interfaces/step-decision.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetCurrentDecisionOnStepFlowConfig } from '../store/step-flow.actions';

@Injectable({
    providedIn: 'root'
})
export class StepFactory {
    static createFlow(store: Store, stepFlowConfig: StepFlowConfig): Step[] {
        let steps: Step[] = [];
        stepFlowConfig.steps.forEach((stepConfig: StepConfig | StepDecision) => {
            if (instanceOfStepDecision(stepConfig)) {
                steps = steps.concat(this.decideFlow(store, stepConfig as StepDecision));
            } else {
                steps.push(this.createStep(stepConfig as StepConfig));
            }
        });
        return steps;
    }

    static createStep(stepConfig: StepConfig) {
        let stepBuilder: StepBuilder;

        stepBuilder = StepBuilder.aStepWithNoImageAndHeader(
            stepConfig.key,
            stepConfig.layoutOptions,
            stepConfig.analyticsOptions)
            .withComponent(stepConfig.component);

        if (stepConfig.isFinalState) {
            stepBuilder.withFinalState();
        }
        return stepBuilder.build();
    }

    static decideFlow(store: Store, stepDecision: StepDecision): Step[] {
        const decidedFlow = stepDecision.decisionFunction(store, stepDecision.possibleResults, stepDecision.currentDecision);
        store.dispatch(new SetCurrentDecisionOnStepFlowConfig(stepDecision, decidedFlow));
        if (stepDecision.currentDecision !== decidedFlow && typeof decidedFlow.initFlowAction === 'function') {
            decidedFlow.initFlowAction(store);
        }
        return this.createFlow(store, decidedFlow);
    }
}
