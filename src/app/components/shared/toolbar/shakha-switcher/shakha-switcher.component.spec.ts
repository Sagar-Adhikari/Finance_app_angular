import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakhaSwitcherComponent } from './shakha-switcher.component';

describe('ShakhaSwitcherComponent', () => {
  let component: ShakhaSwitcherComponent;
  let fixture: ComponentFixture<ShakhaSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakhaSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakhaSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
