import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTaskComponent } from './role-task.component';

describe('RoleTaskComponent', () => {
  let component: RoleTaskComponent;
  let fixture: ComponentFixture<RoleTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
