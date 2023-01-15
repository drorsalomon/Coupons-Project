import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-allcustcoupons',
  templateUrl: './get-allcustcoupons.component.html',
  styleUrls: ['./get-allcustcoupons.component.css']
})
export class GetAllCustCouponsComponent implements OnInit {

  private title: string;
  private userFeedback: string;
  private userToken: string;
  private couponList: Coupon[];

  constructor(private customerService: CustomerService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.title = "Coupons";
    this.getCustomerCoupons();
  }

  getCustomerCoupons() {

    const observer: Observable<Coupon[]> = this.customerService.getCustomerCoupons(this.userToken);

    observer.subscribe(
      (res) => {
        this.couponList = res;
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! there are no coupons listed";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
  }

}
