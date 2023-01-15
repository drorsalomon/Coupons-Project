import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  private updateCouponForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;
  private couponList: Coupon[];

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private dataService: DataService) { }

  ngOnInit() {
    this.updateCouponForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: [''],
      category: [''],
      amount: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      date: [''],
      img: ['']
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.getCompanyCoupons()
  }

  get f() { return this.updateCouponForm.controls; }

  getCompanyCoupons() {
    const observer: Observable<Coupon[]> = this.companyService.getCompanyCoupons(this.userToken);

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
    if (this.updateCouponForm.invalid) {
      return;
    }

    var id = this.updateCouponForm.controls['id'].value;
    var title = this.updateCouponForm.controls['title'].value;
    var category = this.updateCouponForm.controls['category'].value;
    var amount = this.updateCouponForm.controls['amount'].value;
    var price = this.updateCouponForm.controls['price'].value;
    var description = this.updateCouponForm.controls['description'].value;
    var date = this.updateCouponForm.controls['date'].value;
    var img = this.updateCouponForm.controls['img'].value;

    const observer: Observable<Coupon> = this.companyService.updateCoupon(this.userToken, id, title, category, amount, price, description, date, img);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Coupon successfully updated*****"
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! one of the details entered is invalid";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
  }

}
