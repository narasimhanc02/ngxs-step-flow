import { StepConfig } from './step-config.interface';
import { StepDecision } from './step-decision.interface';
import { Store } from '@ngxs/store';

export type InitFlowAction = (store: Store) => void;

export interface StepFlowConfig {
    key: string;
    steps: (StepConfig | StepDecision)[];
    initFlowAction?: InitFlowAction;
}
