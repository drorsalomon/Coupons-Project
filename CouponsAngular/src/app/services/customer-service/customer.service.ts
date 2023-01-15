import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public buyCoupon(userToken, title): Observable<Coupon> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('title', title);

    return this.httpClient.get<Coupon>("http://localhost:8080/couponSystem/buyCoupon", { params: params });
  }

  public getAvailableCoupons(userToken): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getAvailableCoupons", { params: params });
  }

  public getCustomerCoupons(userToken): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCustomerCoupons", { params: params });
  }

  public getCustomerCouponsByCategory(userToken, category): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('category', category);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCustomerCouponsByCategory", { params: params });
  }

  public getCustomerCouponsByPrice(userToken, price): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('price', price);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCustomerCouponsByPrice", { params: params });
  }

  public getCustomerDetails(userToken): Observable<Customer> {
    let params = new HttpParams()
      .set('userToken', userToken);

    return this.httpClient.get<Customer>("http://localhost:8080/couponSystem/getCustomerDetails", { params: params });
  }
}