import { StepLayoutOptionsInterface } from '../step-layout-options.interface';
import { StepAnalyticsOptions } from '../interfaces/step-analytics-options.interface';

export interface StepConfig {
    key: string;
    imagePath?: string;
    header?: string;
    component: any;
    isFinalState?: boolean;

    layoutOptions?: StepLayoutOptionsInterface;
    analyticsOptions?: StepAnalyticsOptions;
}
