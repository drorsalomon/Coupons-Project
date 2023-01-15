import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefmenuComponent } from './defmenu.component';

describe('DefmenuComponent', () => {
  let component: DefmenuComponent;
  let fixture: ComponentFixture<DefmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
