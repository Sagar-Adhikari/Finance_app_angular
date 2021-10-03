import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCategorySelectorComponent } from './member-category-selector.component';

describe('MemberCategorySelectorComponent', () => {
  let component: MemberCategorySelectorComponent;
  let fixture: ComponentFixture<MemberCategorySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCategorySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
