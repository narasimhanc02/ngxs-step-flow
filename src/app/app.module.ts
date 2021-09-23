import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ContactSchedulerModule} from './contact-scheduler/contact-scheduler.module';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment.prod';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        NgxsModule.forRoot(
          [],
          {developmentMode: !environment.production}
        ),
          ContactSchedulerModule
    ],
  providers: [
      {
      provide: 'Window',
      useValue: window
    }
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
