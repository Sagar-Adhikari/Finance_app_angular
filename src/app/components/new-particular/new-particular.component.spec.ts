import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParticularComponent } from './new-particular.component';

describe('NewParticularComponent', () => {
  let component: NewParticularComponent;
  let fixture: ComponentFixture<NewParticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
