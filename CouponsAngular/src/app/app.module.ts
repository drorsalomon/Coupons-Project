import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/mainComponents/layout/layout.component';
import { HeaderComponent } from './components/mainComponents/header/header.component';
import { FooterComponent } from './components/mainComponents/footer/footer.component';
import { MenuComponent } from './components/mainComponents/menu/menu.component';
import { ViewComponent } from './components/mainComponents/view/view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './components/mainComponents/banner/banner.component';
import { HomeIconComponent } from './components/mainComponents/home-icon/home-icon.component';
import { LogoutIconComponent } from './components/mainComponents/logout-icon/logout-icon.component';
import { LoginComponent } from './components/mainComponents/login/login.component';
import { HomepageComponent } from './components/mainComponents/homepage/homepage.component';
import { AdminMenuComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-menu.component';
import { AddCompanyComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/add-company/add-company.component';
import { UpdateCompanyComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/update-company/update-company.component';
import { DeleteCompanyComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/delete-company/delete-company.component';
import { GetCompaniesComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/get-companies/get-companies.component';
import { GetCompanyidComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/get-companyid/get-companyid.component';
import { AddCustomerComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/delete-customer/delete-customer.component';
import { GetCustomersComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/get-customers/get-customers.component';
import { GetCustomeridComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-items/get-customerid/get-customerid.component';
import { CompanyMenuComponent } from './components/mainComponents/menu/company-menu/company-menu/company-menu.component';
import { AddCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/update-coupon/update-coupon.component';
import { DeleteCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/delete-coupon/delete-coupon.component';
import { GetAllcouponsComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-allcoupons/get-allcoupons.component';
import { GetCouponcategoryComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-couponcategory/get-couponcategory.component';
import { GetCouponpriceComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-couponprice/get-couponprice.component';
import { GetComapnydetailsComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-comapnydetails/get-comapnydetails.component';
import { CustomerMenuComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-menu.component';
import { BuyCouponComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/buy-coupon/buy-coupon.component';
import { GetCustomerdetailsComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-customerdetails/get-customerdetails.component';
import { LoginIconComponent } from './components/mainComponents/login-icon/login-icon.component';
import { DefmenuComponent } from './components/mainComponents/defmenu/defmenu.component';
import { GetAllCustCouponsComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-allcustcoupons/get-allcustcoupons.component';
import { GetCouponCustCategoryComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-custcouponcategory/get-custcouponcategory.component';
import { GetCouponCustPriceComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-custcouponprice/get-custcouponprice.component';
import { PagenotfoundComponent } from './components/mainComponents/pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ViewComponent,
    BannerComponent,
    HomeIconComponent,
    LogoutIconComponent,
    LoginComponent,
    HomepageComponent,
    AdminMenuComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    DeleteCompanyComponent,
    GetCompaniesComponent,
    GetCompanyidComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    GetCustomersComponent,
    GetCustomeridComponent,
    CompanyMenuComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    DeleteCouponComponent,
    GetAllcouponsComponent,
    GetCouponcategoryComponent,
    GetCouponpriceComponent,
    GetComapnydetailsComponent,
    CustomerMenuComponent,
    BuyCouponComponent,
    GetCustomerdetailsComponent,
    GetAllCustCouponsComponent,
    GetCouponCustCategoryComponent,
    GetCouponCustPriceComponent,
    LoginIconComponent,
    DefmenuComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
