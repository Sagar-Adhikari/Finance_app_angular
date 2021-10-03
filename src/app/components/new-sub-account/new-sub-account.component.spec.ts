import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubAccountComponent } from './new-sub-account.component';

describe('NewSubAccountComponent', () => {
  let component: NewSubAccountComponent;
  let fixture: ComponentFixture<NewSubAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
