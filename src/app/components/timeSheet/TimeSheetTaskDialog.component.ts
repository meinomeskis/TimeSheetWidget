import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-timesheet-task-dialog',
    template: '<div>Add new task</div>',
})
export class TimeSheetTaskDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
