import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinPusteComponent } from './tin-puste.component';

describe('TinPusteComponent', () => {
  let component: TinPusteComponent;
  let fixture: ComponentFixture<TinPusteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinPusteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinPusteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
