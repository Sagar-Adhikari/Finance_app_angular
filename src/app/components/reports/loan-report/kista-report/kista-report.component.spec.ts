import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KistaReportComponent } from './kista-report.component';

describe('KistaReportComponent', () => {
  let component: KistaReportComponent;
  let fixture: ComponentFixture<KistaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KistaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KistaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
