import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeInfoComponent } from './nominee-info.component';

describe('NomineeInfoComponent', () => {
  let component: NomineeInfoComponent;
  let fixture: ComponentFixture<NomineeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomineeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
