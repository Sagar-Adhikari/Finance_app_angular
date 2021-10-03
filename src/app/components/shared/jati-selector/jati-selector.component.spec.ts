import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JatiSelectorComponent } from './jati-selector.component';

describe('JatiSelectorComponent', () => {
  let component: JatiSelectorComponent;
  let fixture: ComponentFixture<JatiSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JatiSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JatiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
