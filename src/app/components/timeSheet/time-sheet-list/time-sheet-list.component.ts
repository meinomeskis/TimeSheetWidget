import { Component, OnInit } from '@angular/core';
import { ListItemModel, ColumnType, TimeSheetModel } from '../timeSheetModel';
import { DataService } from '../../../service/data.service';
import * as moment from 'moment';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-time-sheet-list',
  templateUrl: './time-sheet-list.component.html',
  styleUrls: ['./time-sheet-list.component.scss']
})
export class TimeSheetListComponent implements OnInit {

  private ListItems: Array<ListItemModel> = [];

  constructor(private dataService: DataService) {
  }

  public UpdateModel(momentDate: moment.Moment) {
    this.dataService.getTimeSheets.subscribe(timeSheets => {
      const dayTasks = timeSheets
        .filter(x => this.dataService.formatId(moment(x.date)) === this.dataService.formatId(momentDate));
      this.ListItems = [];
      this.updateHoursEvents(dayTasks);
      this.updateExpenses(dayTasks);
      this.updateAdditionalHours(dayTasks);
    });
  }

  private updateHoursEvents(timeSheetModel: Array<TimeSheetModel>) {
    const hoursEvents = timeSheetModel.filter(x => x.isHoursEventType).sort((a, b) => (moment(a.date).diff(b.date)) > 0 ? 1 : -1);
    if (hoursEvents.length > 0) {

      const startTime = moment(hoursEvents[0].firstTaskStart).format('HH:mm');
      const endTime = moment(hoursEvents[0].lastTaskEnd).format('HH:mm');
      const data: Array<Array<string | number>> = [];
      for (const event of hoursEvents) {
        // Duration is missing in dataModel
        const formatted = moment.utc(event.quantity * 1000).format('HH:mm');
        const row = [event.eventType, formatted];
        data.push(row);
      }

      this.ListItems.push({
        icon: 'access_time',
        headerLeftTitle: 'Hours',
        headerRightTitle: `(${startTime} - ${endTime})`,
        columns: ['Type', 'Duration'],
        data
      });
    }
  }

  private updateExpenses(timeSheetModel: TimeSheetModel[]) {
    const expenses = timeSheetModel.filter(x => x.isExpenseType)
      .sort((a, b) => (moment(a.date).diff(b.date)) > 0 ? 1 : -1);
    if (expenses.length > 0) {
      const data: Array<Array<string | number>> = [];
      for (const event of expenses) {
        const row = [event.eventType, event.quantity, Math.round((event.price * event.quantity) * 100) / 100];
        data.push(row);
      }
      this.ListItems.push({
        icon: 'attach_money',
        headerLeftTitle: 'Expenses',
        headerRightTitle: null,
        columns: ['Type', 'Quantity', 'Total'],
        data
      });
    }
  }

  private updateAdditionalHours(timeSheetModel: TimeSheetModel[]) {
    const expenses = timeSheetModel.filter(x => x.isAdditionalHoursEventType)
      .sort((a, b) => (moment(a.date).diff(b.date)) > 0 ? 1 : -1);
    if (expenses.length > 0) {
      const data: Array<Array<string | number>> = [];
      for (const event of expenses) {
        const row = [event.eventType, event.quantity];
        data.push(row);
      }
      this.ListItems.push({
        icon: 'timer_off',
        headerLeftTitle: 'Aditional hours',
        headerRightTitle: null,
        columns: ['Type', 'Amount'],
        data
      });
    }
  }

  ngOnInit() {
  }
}
