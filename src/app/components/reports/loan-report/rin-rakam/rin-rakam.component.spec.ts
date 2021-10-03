import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RinRakamComponent } from './rin-rakam.component';

describe('RinRakamComponent', () => {
  let component: RinRakamComponent;
  let fixture: ComponentFixture<RinRakamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RinRakamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RinRakamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
