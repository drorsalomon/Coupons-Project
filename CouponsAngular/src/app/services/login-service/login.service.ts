import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Login } from 'src/app/models/Login';

@Injectable({
  providedIn: 'root'
})

export class loginService {

  constructor(private httpClient: HttpClient) { }

  public loginCheck(email, password): Observable<Login> {
    let params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.httpClient.get<Login>("http://localhost:8080/couponSystem/loginCheck", { params: params });
  }

  public logOut(email): Observable<Login> {
    let params = new HttpParams()
      .set('email', email)


    return this.httpClient.get<Login>("http://localhost:8080/couponSystem/userLogout", { params: params });
  }
}