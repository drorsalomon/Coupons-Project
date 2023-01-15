import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data-service/data.service';
import { Coupon } from 'src/app/models/Coupon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-coupon',
  templateUrl: './buy-coupon.component.html',
  styleUrls: ['./buy-coupon.component.css']
})
export class BuyCouponComponent implements OnInit {

  private buyCouponForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;
  private couponList: Coupon[];

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.buyCouponForm = this.formBuilder.group({
      title: ['', Validators.required],
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.getAvailableCoupons()
  }

  get f() { return this.buyCouponForm.controls; }

    getAvailableCoupons() {

    const observer: Observable<Coupon[]> = this.customerService.getAvailableCoupons(this.userToken);

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

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.buyCouponForm.invalid) {
      return;
    }

    var title = this.buyCouponForm.controls['title'].value;

    const observer: Observable<Coupon> = this.customerService.buyCoupon(this.userToken, title);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Coupon successfully purchased*****"
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! coupon not found";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
  }
}
