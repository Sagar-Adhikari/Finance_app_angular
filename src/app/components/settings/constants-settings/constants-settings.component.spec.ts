import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantsSettingsComponent } from './constants-settings.component';

describe('ConstantsSettingsComponent', () => {
  let component: ConstantsSettingsComponent;
  let fixture: ComponentFixture<ConstantsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstantsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
