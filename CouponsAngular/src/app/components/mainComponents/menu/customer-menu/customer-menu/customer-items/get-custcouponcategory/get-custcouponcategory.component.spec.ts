import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCouponCustCategoryComponent } from './get-custcouponcategory.component';

describe('GetCouponcategoryComponent', () => {
  let component: GetCouponCustCategoryComponent;
  let fixture: ComponentFixture<GetCouponCustCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCouponCustCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCouponCustCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
