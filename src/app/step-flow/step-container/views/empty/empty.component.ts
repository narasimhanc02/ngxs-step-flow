import { AbstractStep } from '../abstract-step.component';
import { Component, ComponentFactoryResolver, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-empty',
    templateUrl: './empty.component.html'
})
export class EmptyComponent extends AbstractStep {
    constructor(
        public componentFactoryResolver: ComponentFactoryResolver,
        public renderer: Renderer2
    ) {
        super(componentFactoryResolver, renderer);
    }
}
