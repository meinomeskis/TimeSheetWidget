import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { TimeSheetCalendarComponent } from '../time-sheet-calendar/time-sheet-calendar.component';
import * as moment from 'moment';
import { TimeSheetListComponent } from '../time-sheet-list/time-sheet-list.component';
import { MatDialog } from '@angular/material/dialog';
import { TimeSheetTaskDialogComponent } from '../TimeSheetTaskDialog.component';

@Component({
  selector: 'app-time-sheet-widget',
  templateUrl: './time-sheet-widget.component.html',
  styleUrls: ['./time-sheet-widget.component.scss']
})
export class TimeSheetWidgetComponent implements AfterViewInit {

  @ViewChild(TimeSheetCalendarComponent, { static: true }) calendar: TimeSheetCalendarComponent;
  @ViewChild(TimeSheetListComponent, { static: true }) list: TimeSheetListComponent;

  ngAfterViewInit(): void {
    this.list.UpdateModel(this.calendar.currentMomentDate);
    this.calendar.onDateSelectedEvent = () => {
      this.list.UpdateModel(this.calendar.currentMomentDate);
    };
  }

  constructor(public dialog: MatDialog, private dataService: DataService) {
    this.dataService.LoadData();
  }

  private getDate() {
    return this.calendar.currentMomentDate.format('dddd DD.MM.YYYY');
  }

  private addTask() {

    this.dialog.open(TimeSheetTaskDialogComponent, {
      data: {
        animal: 'panda'
      }
    });

  }
}
