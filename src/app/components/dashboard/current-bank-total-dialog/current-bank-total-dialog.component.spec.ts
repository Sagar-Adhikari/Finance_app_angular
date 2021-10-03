import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBankTotalDialogComponent } from './current-bank-total-dialog.component';

describe('CurrentBankTotalDialogComponent', () => {
  let component: CurrentBankTotalDialogComponent;
  let fixture: ComponentFixture<CurrentBankTotalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBankTotalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBankTotalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
