import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponCustPriceComponent } from './get-custcouponprice.component';

describe('GetCouponpriceComponent', () => {
  let component: GetCouponCustPriceComponent;
  let fixture: ComponentFixture<GetCouponCustPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponCustPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponCustPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
