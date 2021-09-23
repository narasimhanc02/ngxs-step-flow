import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
    selector: '[step-host]'
})
export class StepHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
