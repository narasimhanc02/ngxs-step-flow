import { AbstractStep } from '../abstract-step.component';
import { Component, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import {LabelUtil} from '../../../../shared/utils/label.util';

@Component({
    selector: 'tg-step-two-columns-with-image',
    templateUrl: './two-columns-no-image.component.html'
})
export class TwoColumnsNoImageComponent extends AbstractStep {
    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public renderer: Renderer2
    ) {
        super(componentFactoryResolver, renderer);
    }

    getHeaderTitle(): string {
        return LabelUtil.getLabelKeyWithTypeTitle(this.messageGroup + '.steps.' + this.currentStep.key + '-header-title');
    }
}
