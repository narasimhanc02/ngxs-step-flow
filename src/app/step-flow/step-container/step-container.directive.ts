import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appStepContainer]'
})
export class StepContainerDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
