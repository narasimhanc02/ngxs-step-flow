import { AbstractStep } from '../abstract-step.component';
import { Component, ComponentFactoryResolver, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html'
})
export class DefaultComponent extends AbstractStep {
    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public renderer: Renderer2
    ) {
        super(componentFactoryResolver, renderer);
    }
}
