import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhaSelectorComponent } from './shakha-selector.component';

describe('ShakhaSelectorComponent', () => {
  let component: ShakhaSelectorComponent;
  let fixture: ComponentFixture<ShakhaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakhaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
