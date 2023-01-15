import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCustCouponsComponent } from './get-allcustcoupons.component';

describe('GetAllcouponsComponent', () => {
  let component: GetAllCustCouponsComponent;
  let fixture: ComponentFixture<GetAllCustCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllCustCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllCustCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
