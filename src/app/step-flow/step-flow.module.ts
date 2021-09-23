import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from './step-container/views/empty/empty.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { StepContainerDirective } from './step-container/step-container.directive';
import { StepContainerComponent } from './step-container/step-container.component';
import { DefaultComponent } from './step-container/views/default/default.component';
import { StepHostDirective } from './step-container/directives/step-host.directive';
import { TwoColumnsNoImageComponent } from './step-container/views/two-columns-no-image/two-columns-no-image.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        StepContainerDirective,
        StepHostDirective,
        StepContainerComponent,
        NavigationBarComponent,
        DefaultComponent,
        EmptyComponent,
        TwoColumnsNoImageComponent
    ],
    exports: [
        StepContainerComponent,
        NavigationBarComponent
    ],
    providers: [
    ],
    entryComponents: [
        DefaultComponent,
        EmptyComponent,
        TwoColumnsNoImageComponent
    ]
})
export class StepFlowModule {
    constructor() {}
}

