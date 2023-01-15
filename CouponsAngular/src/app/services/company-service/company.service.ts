import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';
import { HttpParams } from '@angular/common/http';
import { Company } from 'src/app/models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  public addCoupon(userToken, title, category, amount, price, description, date, img): Observable<Coupon> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('title', title)
      .set('category', category)
      .set('amount', amount)
      .set('price', price)
      .set('description', description)
      .set('date', date)
      .set('img', img);

    return this.httpClient.get<Coupon>("http://localhost:8080/couponSystem/addCoupon", { params: params });
  }

  public updateCoupon(userToken, id, title, category, amount, price, description, date, img): Observable<Coupon> {
    let params = new HttpParams()
      .set('id', id)
      .set('userToken', userToken)
      .set('title', title)
      .set('category', category)
      .set('amount', amount)
      .set('price', price)
      .set('description', description)
      .set('date', date)
      .set('img', img);

    return this.httpClient.get<Coupon>("http://localhost:8080/couponSystem/updateCoupon", { params: params });
  }

  public deleteCoupon(userToken, id): Observable<Coupon> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('id', id);

    return this.httpClient.get<Coupon>("http://localhost:8080/couponSystem/deleteCoupon", { params: params });
  }

  public getCompanyCoupons(userToken): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCompanyCoupons", { params: params });
  }

  public getCompanyCouponsByCategory(userToken, category): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('category', category);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCompanyCouponsByCategory", { params: params });
  }

  public getCompanyCouponsByPrice(userToken, price): Observable<Coupon[]> {
    let params = new HttpParams()
      .set('userToken', userToken)
      .set('price', price);

    return this.httpClient.get<Coupon[]>("http://localhost:8080/couponSystem/getCompanyCouponsByPrice", { params: params });
  }

  public getCompanyDetails(userToken): Observable<Company> {
    let params = new HttpParams()
      .set('userToken', userToken);

    return this.httpClient.get<Company>("http://localhost:8080/couponSystem/getCompanyDetails", { params: params });
  }
}