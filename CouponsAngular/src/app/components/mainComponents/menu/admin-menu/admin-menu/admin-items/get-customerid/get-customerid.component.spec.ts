import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomeridComponent } from './get-customerid.component';

describe('GetCustomeridComponent', () => {
  let component: GetCustomeridComponent;
  let fixture: ComponentFixture<GetCustomeridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCustomeridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCustomeridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
