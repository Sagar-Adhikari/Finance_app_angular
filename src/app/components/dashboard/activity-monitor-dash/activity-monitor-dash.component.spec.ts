import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMonitorDashComponent } from './activity-monitor-dash.component';

describe('ActivityMonitorDashComponent', () => {
  let component: ActivityMonitorDashComponent;
  let fixture: ComponentFixture<ActivityMonitorDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityMonitorDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMonitorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
