import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountSelectorComponent } from './sub-account-selector.component';

describe('SubAccountSelectorComponent', () => {
  let component: SubAccountSelectorComponent;
  let fixture: ComponentFixture<SubAccountSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAccountSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
