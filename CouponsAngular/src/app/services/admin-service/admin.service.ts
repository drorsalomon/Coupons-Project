import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Company } from 'src/app/models/Company';
import { Customer } from 'src/app/models/Customer';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public addCompany(compEmail, compPassword, compName): Observable<Company> {
    let params = new HttpParams()
      .set('compEmail', compEmail)
      .set('compPassword', compPassword)
      .set('compName', compName);

    return this.httpClient.get<Company>("http://localhost:8080/couponSystem/addCompany", { params: params });
  }

  public updateCompany(compId, compEmail, compPassword): Observable<Company> {
    let params = new HttpParams()
      .set('compId', compId)
      .set('compEmail', compEmail)
      .set('compPassword', compPassword);

    return this.httpClient.get<Company>("http://localhost:8080/couponSystem/updateCompany", { params: params });
  }

  public deleteCompany(compId): Observable<Company> {
    let params = new HttpParams()
      .set('compId', compId);

    return this.httpClient.get<Company>("http://localhost:8080/couponSystem/deleteCompany", { params: params });
  }

  public getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>("http://localhost:8080/couponSystem/getCompanies");
  }

  public getCompanyById(compId): Observable<Company> {
    let params = new HttpParams()
      .set('compId', compId);

    return this.httpClient.get<Company>("http://localhost:8080/couponSystem/getCompanyById", { params: params });
  }

  public addCustomer(custEmail, custPassword, custName, custLastName): Observable<Customer> {
    let params = new HttpParams()
      .set('custEmail', custEmail)
      .set('custPassword', custPassword)
      .set('custName', custName)
      .set('custLastName', custLastName);

    return this.httpClient.get<Customer>("http://localhost:8080/couponSystem/addCustomer", { params: params });
  }

  public updateCustomer(custId, custEmail, custPassword, custName, custLastName): Observable<Customer> {
    let params = new HttpParams()
      .set('custId', custId)
      .set('custEmail', custEmail)
      .set('custPassword', custPassword)
      .set('custName', custName)
      .set('custLastName', custLastName);

    return this.httpClient.get<Customer>("http://localhost:8080/couponSystem/updateCustomer", { params: params });
  }

  public deleteCustomer(custId): Observable<Customer> {
    let params = new HttpParams()
      .set('custId', custId);

    return this.httpClient.get<Customer>("http://localhost:8080/couponSystem/deleteCustomer", { params: params });
  }

  public getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>("http://localhost:8080/couponSystem/getCustomers");
  }

  public getCustomerById(custId): Observable<Customer> {
    let params = new HttpParams()
      .set('custId', custId);

    return this.httpClient.get<Customer>("http://localhost:8080/couponSystem/getCustomerById", { params: params });
  }
}