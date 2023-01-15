import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-custcouponprice',
  templateUrl: './get-custcouponprice.component.html',
  styleUrls: ['./get-custcouponprice.component.css']
})
export class GetCouponCustPriceComponent implements OnInit {

  private getCouponPriceForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;
  private couponList: Coupon[];
  
  constructor(private customerService: CustomerService, private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.getCouponPriceForm = this.formBuilder.group({
      price: ['', Validators.required],
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
  }

  get f() { return this.getCouponPriceForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.getCouponPriceForm.invalid) {
      return;
    }

    var price = this.getCouponPriceForm.controls['price'].value;

    const observer: Observable<Coupon[]> = this.customerService.getCustomerCouponsByPrice(this.userToken, price);

    observer.subscribe(
      (res) => {
        this.couponList = res;
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! there are no coupons listed below this price";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
  }


}
