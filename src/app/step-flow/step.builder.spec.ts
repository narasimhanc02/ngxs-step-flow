// import { cleanStylesFromDom } from '@tg-shared/common/utils/clean-style-tags.util';
import { StepBuilder } from './step.builder';
import { DefaultComponent } from './step-container/views/default/default.component';
import { EmptyComponent } from './step-container/views/empty/empty.component';

describe('StepBuilder', () => {
    describe('aStep', () => {
        it('should return a step containing a certain key and the default component template.',
            () => {
                const step = StepBuilder.aStep('first-step', {contentId: 'content-id'}).build();
                expect(step.key).toBe('first-step');
                expect(step.template).toEqual(DefaultComponent);
                expect(step.layoutOptions.contentId).toEqual('content-id');
            });
    });

    describe('anEmptyStep', () => {
        it('should return an empty step with a certain key and the default component template.',
            () => {
                const step = StepBuilder.anEmptyStep('first-step').build();
                expect(step.key).toBe('first-step');
                expect(step.template).toEqual(EmptyComponent);
            });
    });

    describe('withComponent', () => {
        it('should return a step with a certain component',
            () => {
                const step = StepBuilder.anEmptyStep('first-step')
                    .withComponent('mycomponent')
                    .build();
                expect(step.component.selector).toBe('mycomponent');
            });
    });

    describe('withEnabledState', () => {
        it('should return a step with enabled state true per default',
            () => {
                const step = StepBuilder.anEmptyStep('first-step').build();
                expect(step.isEnabled).toBe(true);
            });

        it('should return a step with enabled state true when set excplicitly set to true',
            () => {
                const step = StepBuilder.anEmptyStep('first-step').withEnabledState(true).build();
                expect(step.isEnabled).toBe(true);
            });

        it('should return a step with enabled state false when set excplicitly set to false',
            () => {
                const step = StepBuilder.anEmptyStep('first-step').withEnabledState(false).build();
                expect(step.isEnabled).toBe(false);
            });
    });

    describe('withFinalState', () => {
        it('should return a step with a non final state per default',
            () => {
                const step = StepBuilder.anEmptyStep('first-step')
                    .build();
                expect(step.isFinal()).toBe(false);
            });

        it('should return a step with a state type of finale',
            () => {
                const step = StepBuilder.anEmptyStep('first-step')
                    .withFinalState()
                    .build();
                expect(step.isFinal()).toBe(true);
            });
    });

    describe('withOverwriteFlowLabel', () => {
        it('should return a step with a flow label', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .withOverwriteFlowLabel('someLabel')
                .build();
            expect(step.overwriteFlowLabel).toBe('someLabel');
        });
        it('should return a step with flow label undefined as default', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .build();
            expect(step.overwriteFlowLabel).toBe(undefined);
        });
    });

    describe('withMobileImage', () => {
        it('should return a step with a mobile image', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .withMobileImage('someImage')
                .build();
            expect(step.imageMobile).toBe('someImage');
        });
        it('should return a step with mobile image undefined as default', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .build();
            expect(step.imageMobile).toBe(undefined);
        });
    });


    describe('withScrollableImage', () => {
        it('should return a step with a scrollable image as true', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .withScrollableImage(true)
                .build();
            expect(step.isImageScrollable).toBe(true);
        });

        it('should return a step with a scrollable image as undefined by default', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .build();
            expect(step.isImageScrollable).toBe(undefined);
        });
    });
    describe('withAsAlternativeFirstStep', () => {
        it('should set the step as an alternative first step and return the builder', () => {
            const step = StepBuilder.anEmptyStep('first-step')
                .withAsAlternativeFirstStep()
                .build();

            expect(step.asAlternativeFirstStep).toBeTrue();
        });
    });

    afterEach(() => {
        // cleanStylesFromDom();
    });
});
