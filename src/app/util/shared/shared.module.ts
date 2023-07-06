
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar/calendar.component';
import { ValidateMessageComponent } from './validate-message/validate-message/validate-message.component';

import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    ValidateMessageComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CalendarModule
  ],
  exports: [
    ValidateMessageComponent,
    CalendarComponent
  ]
})
export class SharedModule { }
