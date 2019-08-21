import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { DataService } from '../../../service/data.service';
import { isNgTemplate } from '@angular/compiler';
import { DayStatus, CalendarDay } from './../timeSheetModel';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-time-sheet-calendar',
  templateUrl: './time-sheet-calendar.component.html',
  styleUrls: ['./time-sheet-calendar.component.scss']
})
export class TimeSheetCalendarComponent implements OnInit {
  private week: Array<CalendarDay> = [];
  private currentDate: string;
  public currentMomentDate: moment.Moment;


  public onDateSelectedEvent: () => void = null;


  constructor(private dataService: DataService) {
  }

  private setWeekData(date: moment.Moment) {
    if (date == null) {
      date = moment();
    }
    this.currentMomentDate = moment(date);
    this.currentDate = date.format('MMMM YYYY');
    this.week = [];
    for (let i = 0; i < 7; i++) {
      const isToday = date.isSame(moment(), 'day');
      const isWeekend = date.weekday() % 6 === 0;
      this.week.unshift({
        id: this.dataService.formatId(date),
        durationText: '-',
        dayOfMonth: date.format('D'),
        dayStatus: DayStatus.none,
        isActive: isToday,
        isToday,
        isWeekend,
        weekName: date.format('ddd')
      });
      date.subtract({ day: 1 });
    }

    if (this.onDateSelectedEvent !== null) {
      this.onDateSelectedEvent();
    }
  }

  private selectToday() {
    this.setWeekData(moment());
    this.week.forEach(x => {
      if (x.isToday) {
        x.isActive = true;
      } else {
        x.isActive = false;
      }
    });
    this.loadTimeSheets();
  }

  private getState(day: CalendarDay) {
    return {
      today: day.isToday,
      active: day.isActive
    };
  }

  private activateDate(id: string) {
    this.week.forEach(x => {
      if (x.id === id) {
        x.isActive = true;
        this.currentMomentDate = moment(x.id);
      } else {
        x.isActive = false;
      }
    });
    if (this.onDateSelectedEvent !== null) {
      this.onDateSelectedEvent();
    }
  }

  private getTaskStatusStyle(status: DayStatus): string {
    switch (status) {
      case DayStatus.green:
        return 'green';
      case DayStatus.grey:
        return 'gray';
      case DayStatus.red:
        return 'red';
      default:
        return null;
    }
  }



  private selectedDate(event: any) {
    this.currentMomentDate = moment(event.value);
    this.setWeekData(this.currentMomentDate);
    this.activateDate(this.dataService.formatId(this.currentMomentDate));
    this.loadTimeSheets();
  }

  private loadTimeSheets() {
    this.dataService.getTimeSheets.subscribe(timeSheets => {
      this.week.forEach(weekDay => {
        const dayTasks = timeSheets.filter(x => x.isWorkHour &&  this.dataService.formatId(moment(x.date)) === weekDay.id);
        if (dayTasks.length === 0) {
          return;
        }
        let totalDuration: null | moment.Moment = null;
        dayTasks.forEach(task => {
          if (totalDuration === null) {
            totalDuration = moment
              .utc(moment(task.lastTaskEnd).diff(moment(task.firstTaskStart)));
          } else {
            const aaa = moment.utc(moment(task.lastTaskEnd).diff(moment(task.firstTaskStart)));
            totalDuration.add(aaa.seconds(), 'seconds');
          }
        });
        if (totalDuration.unix() > 0) {
          weekDay.durationText = totalDuration.format('HH:mm');
        } else {
          weekDay.durationText = '-';
        }

        const isAnyRejected = dayTasks.filter(x => x.isRejected === true).length > 0;
        const isAnyApproved = dayTasks.filter(x => x.isApproved === true).length > 0;
        const isAnyTaskCount = dayTasks.filter(x => x.tasksCount > 0).length > 0;

        if (isAnyRejected) {
          weekDay.dayStatus = DayStatus.red;
        } else if (isAnyApproved) {
          weekDay.dayStatus = DayStatus.green;
        } else if (isAnyTaskCount) {
          weekDay.dayStatus = DayStatus.grey;
        } else {
          weekDay.dayStatus = DayStatus.none;
        }
      });
    });
  }

  ngOnInit() {
    this.setWeekData(this.currentMomentDate);
    this.loadTimeSheets();
  }

}



