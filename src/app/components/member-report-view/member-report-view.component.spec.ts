import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberReportViewComponent } from './member-report-view.component';

describe('MemberReportViewComponent', () => {
  let component: MemberReportViewComponent;
  let fixture: ComponentFixture<MemberReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
