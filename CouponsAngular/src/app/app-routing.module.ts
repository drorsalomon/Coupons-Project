import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/mainComponents/login/login.component';
import { HomepageComponent } from './components/mainComponents/homepage/homepage.component';
import { MenuComponent } from './components/mainComponents/menu/menu.component';
import { AdminMenuComponent } from './components/mainComponents/menu/admin-menu/admin-menu/admin-menu.component';
import { CompanyMenuComponent } from './components/mainComponents/menu/company-menu/company-menu/company-menu.component';
import { CustomerMenuComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-menu.component';
import { LoginIconComponent } from './components/mainComponents/login-icon/login-icon.component';
import { LogoutIconComponent } from './components/mainComponents/logout-icon/logout-icon.component';
import { DefmenuComponent } from './components/mainComponents/defmenu/defmenu.component';
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
import { AddCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/update-coupon/update-coupon.component';
import { DeleteCouponComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/delete-coupon/delete-coupon.component';
import { GetAllcouponsComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-allcoupons/get-allcoupons.component';
import { GetCouponcategoryComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-couponcategory/get-couponcategory.component';
import { GetCouponpriceComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-couponprice/get-couponprice.component';
import { BuyCouponComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/buy-coupon/buy-coupon.component';
import { GetAllCustCouponsComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-allcustcoupons/get-allcustcoupons.component';
import { GetCouponCustCategoryComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-custcouponcategory/get-custcouponcategory.component';
import { GetCouponCustPriceComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-custcouponprice/get-custcouponprice.component';
import { GetCustomerdetailsComponent } from './components/mainComponents/menu/customer-menu/customer-menu/customer-items/get-customerdetails/get-customerdetails.component';
import { GetComapnydetailsComponent } from './components/mainComponents/menu/company-menu/company-menu/company-items/get-comapnydetails/get-comapnydetails.component';
import { PagenotfoundComponent } from './components/mainComponents/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path : "", redirectTo:"/homepage", pathMatch:"full"},
  {path : "login", component: LoginComponent},
  {path : "homepage", component: HomepageComponent},
  {path : "pagenotfound", component: PagenotfoundComponent},
  {path : "menu", component: MenuComponent, outlet:"menuOutlet"},
  {path : "defmenu", component: DefmenuComponent, outlet:"menuOutlet"},
  {path : "login-icon", component: LoginIconComponent, outlet:"headerOutlet"},
  {path : "logout-icon", component: LogoutIconComponent, outlet:"headerOutlet"},
  
  {path : "admin-menu", component: AdminMenuComponent, outlet:"menuOutlet"},
  {path : "add-company", component: AddCompanyComponent},
  {path : "update-company", component: UpdateCompanyComponent},
  {path : "delete-company", component: DeleteCompanyComponent},
  {path : "get-companies", component: GetCompaniesComponent},
  {path : "get-companyid", component: GetCompanyidComponent},

  {path : "add-customer", component: AddCustomerComponent},
  {path : "update-customer", component: UpdateCustomerComponent},
  {path : "delete-customer", component: DeleteCustomerComponent},
  {path : "get-customers", component: GetCustomersComponent},
  {path : "get-customerid", component: GetCustomeridComponent},
  
  {path : "company-menu", component: CompanyMenuComponent, outlet:"menuOutlet"},
  {path : "add-coupon", component: AddCouponComponent},
  {path : "update-coupon", component: UpdateCouponComponent},
  {path : "delete-coupon", component: DeleteCouponComponent},
  {path : "get-allcoupons", component: GetAllcouponsComponent},
  {path : "get-couponcategory", component: GetCouponcategoryComponent},
  {path : "get-couponprice", component: GetCouponpriceComponent},
  {path : "get-companydetails", component: GetComapnydetailsComponent},

  {path : "customer-menu", component: CustomerMenuComponent, outlet:"menuOutlet"},
  {path : "buy-coupon", component: BuyCouponComponent},
  {path : "get-allcustcoupons", component: GetAllCustCouponsComponent},
  {path : "get-custcouponcategory", component: GetCouponCustCategoryComponent},
  {path : "get-custcouponprice", component: GetCouponCustPriceComponent},
  {path : "get-customerdetails", component: GetCustomerdetailsComponent},

  {path : "**", redirectTo:"/pagenotfound", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
