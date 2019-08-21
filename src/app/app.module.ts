import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { TimeSheetModule } from './components/timeSheet/timeSheet.module';
// import { TimesheetWidgetComponent } from './components/timeSheet/timesheet-widget/timesheet-widget.component';
// import { TimesheetCalendarComponent } from './components/timeSheet/timesheet-calendar/timesheet-calendar.component';
// import { TimesheetListComponent } from './components/timeSheet/timesheet-list/timesheet-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    TimeSheetModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
