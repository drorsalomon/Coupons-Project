import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponpriceComponent } from './get-couponprice.component';

describe('GetCouponpriceComponent', () => {
  let component: GetCouponpriceComponent;
  let fixture: ComponentFixture<GetCouponpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
