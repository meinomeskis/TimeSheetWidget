
export interface TimeSheetModel {
    id: number;
    date: Date;
    quantity: number;
    price: number;
    eventType: string;
    isExpenseType: boolean;
    isHoursEventType: boolean;
    isAdditionalHoursEventType: boolean;
    isWorkHour: boolean;
    isApproved: boolean;
    isRejected: boolean;
    tasksCount: number;
    firstTaskStart: Date;
    lastTaskEnd: Date;
}
export enum DayStatus {
    none,
    grey,
    green,
    red
}

export interface CalendarDay {
    weekName?: string;
    dayOfMonth?: string;
    durationText?: string;
    dayStatus?: DayStatus;
    isToday: boolean;
    isActive: boolean;
    isWeekend: boolean;
    id?: string;
}

export enum ColumnType {
    string,
    number,
    time
}

export interface ListItemModel {
    headerLeftTitle: string | null;
    headerRightTitle: string | null;
    icon: string | null;
    columns: Array<string>;
    data: Array<Array<string | number>>;
}
