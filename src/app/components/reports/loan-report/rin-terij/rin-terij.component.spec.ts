import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RinTerijComponent } from './rin-terij.component';

describe('RinTerijComponent', () => {
  let component: RinTerijComponent;
  let fixture: ComponentFixture<RinTerijComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RinTerijComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RinTerijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
