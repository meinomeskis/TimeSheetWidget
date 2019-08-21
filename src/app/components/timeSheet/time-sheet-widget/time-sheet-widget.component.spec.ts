import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetWidgetComponent } from './time-sheet-widget.component';

describe('TimesheetWidgetComponent', () => {
  let component: TimeSheetWidgetComponent;
  let fixture: ComponentFixture<TimeSheetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
