import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationInfoComponent } from './occupation-info.component';

describe('OccupationInfoComponent', () => {
  let component: OccupationInfoComponent;
  let fixture: ComponentFixture<OccupationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
