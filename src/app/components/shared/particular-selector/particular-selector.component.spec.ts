import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularSelectorComponent } from './particular-selector.component';

describe('ParticularSelectorComponent', () => {
  let component: ParticularSelectorComponent;
  let fixture: ComponentFixture<ParticularSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
