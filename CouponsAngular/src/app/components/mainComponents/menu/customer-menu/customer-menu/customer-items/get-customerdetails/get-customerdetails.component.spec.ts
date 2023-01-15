import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCustomerdetailsComponent } from './get-customerdetails.component';

describe('GetCustomerdetailsComponent', () => {
  let component: GetCustomerdetailsComponent;
  let fixture: ComponentFixture<GetCustomerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCustomerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
