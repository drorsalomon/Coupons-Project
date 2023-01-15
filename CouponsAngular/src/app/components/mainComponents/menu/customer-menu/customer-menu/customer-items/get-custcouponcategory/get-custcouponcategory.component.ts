import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/Coupon';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-custcouponcategory',
  templateUrl: './get-custcouponcategory.component.html',
  styleUrls: ['./get-custcouponcategory.component.css']
})
export class GetCouponCustCategoryComponent implements OnInit {

  private getCouponCatForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;
  private couponList: Coupon[];

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder,
    private dataService: DataService) { }

  ngOnInit() {
    this.getCouponCatForm = this.formBuilder.group({
      category: ['', Validators.required],
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
  }

  get f() { return this.getCouponCatForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.getCouponCatForm.invalid) {
      return;
    }

    var category = this.getCouponCatForm.controls['category'].value;

    const observer: Observable<Coupon[]> = this.customerService.getCustomerCouponsByCategory(this.userToken, category);

    observer.subscribe(
      (res) => {
        this.couponList = res;
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! there are no coupons listed in this category";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
  }
}
