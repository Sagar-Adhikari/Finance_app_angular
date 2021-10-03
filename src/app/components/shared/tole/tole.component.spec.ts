import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToleComponent } from './tole.component';

describe('ToleComponent', () => {
  let component: ToleComponent;
  let fixture: ComponentFixture<ToleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
