import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeSheetWidgetComponent } from './/time-sheet-widget/time-sheet-widget.component';
import { TimeSheetCalendarComponent } from './time-sheet-calendar/time-sheet-calendar.component';
import { TimeSheetListComponent } from './time-sheet-list/time-sheet-list.component';
import { MaterialModule } from '../../material/material.module';
import { TimeSheetTaskDialogComponent } from './TimeSheetTaskDialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TimeSheetWidgetComponent
  ],
  entryComponents: [
    TimeSheetTaskDialogComponent
  ],
  declarations: [
    TimeSheetWidgetComponent,
    TimeSheetCalendarComponent,
    TimeSheetListComponent,
    TimeSheetTaskDialogComponent
  ]
})
export class TimeSheetModule { }
