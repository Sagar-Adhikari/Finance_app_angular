import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeAccountInfoComponent } from './cooperative-account-info.component';

describe('CooperativeAccountInfoComponent', () => {
  let component: CooperativeAccountInfoComponent;
  let fixture: ComponentFixture<CooperativeAccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperativeAccountInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperativeAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
