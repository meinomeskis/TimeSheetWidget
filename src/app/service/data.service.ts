import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TimeSheetModel } from '../components/timeSheet/timeSheetModel';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private timeSheets: BehaviorSubject<Array<TimeSheetModel>>;
  private url: string;
  private dataStore: {
    timeSheets: TimeSheetModel[]
  };
  constructor(private http: HttpClient) {

    this.url = './assets/data/timeSheetData.json';
    this.dataStore = { timeSheets: [] };
    this.timeSheets = new BehaviorSubject<TimeSheetModel[]>(this.dataStore.timeSheets);

  }

  get getTimeSheets() {
    return this.timeSheets.asObservable();
  }

  public formatId(date: moment.Moment): string {
    return date.format('YYYYMMDD');
  }


  public LoadData() {
    this.http.get<TimeSheetModel[]>(`${this.url}`).subscribe(data => {
      this.dataStore.timeSheets = data;
      this.timeSheets.next(Object.assign({}, this.dataStore).timeSheets);
    }, error => console.log('Could not load todos.'));

  }

/*

    "id": 7,
    "date": "2019-08-11T00:00:00.000Z",
    "price": 15,
    "quantity": 5,
    "eventType": "tipas1",
    "isExpenseType": false,
    "isHoursEventType": false,
    "isAdditionalHoursEventType": false,
    "isWorkHour": false,
    "isApproved": false,
    "isRejected": false,
    "tasksCount": 5,
    "firstTaskStart": "2019-08-25T08:46:20.075Z",
    "lastTaskEnd": "2019-08-25T13:46:20.075Z"
*/

}
