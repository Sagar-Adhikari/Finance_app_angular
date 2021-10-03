import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteSelectorComponent } from './caste-selector.component';

describe('CasteSelectorComponent', () => {
  let component: CasteSelectorComponent;
  let fixture: ComponentFixture<CasteSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasteSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasteSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
