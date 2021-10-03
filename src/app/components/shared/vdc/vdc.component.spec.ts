import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VdcComponent } from './vdc.component';

describe('VdcComponent', () => {
  let component: VdcComponent;
  let fixture: ComponentFixture<VdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
