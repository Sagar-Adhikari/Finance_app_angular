import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyVoucherComponent } from './daily-voucher.component';

describe('DailyVoucherComponent', () => {
  let component: DailyVoucherComponent;
  let fixture: ComponentFixture<DailyVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
