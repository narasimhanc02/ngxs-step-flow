import {Store} from '@ngxs/store';
import {Step} from '../step.model';

export interface StepInterface {
    store: Store;
    currentStep: Step;
    messageGroup: string;
    bundleName: string;
}
