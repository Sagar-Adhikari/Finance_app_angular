import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountDdComponent } from './sub-account-dd.component';

describe('SubAccountDdComponent', () => {
  let component: SubAccountDdComponent;
  let fixture: ComponentFixture<SubAccountDdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAccountDdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountDdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
