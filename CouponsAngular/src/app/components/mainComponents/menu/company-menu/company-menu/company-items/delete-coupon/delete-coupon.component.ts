import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-coupon',
  templateUrl: './delete-coupon.component.html',
  styleUrls: ['./delete-coupon.component.css']
})
export class DeleteCouponComponent implements OnInit {

  private deleteCouponForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;
  private couponList: Coupon[];

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private dataService: DataService) { }

  ngOnInit() {
    this.deleteCouponForm = this.formBuilder.group({
      id: ['', Validators.required],
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.getCompanyCoupons()
  }

  get f() { return this.deleteCouponForm.controls; }

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
    if (this.deleteCouponForm.invalid) {
      return;
    }

    var id = this.deleteCouponForm.controls['id'].value;

    const observer: Observable<Coupon> = this.companyService.deleteCoupon(this.userToken, id);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Coupon successfully deleted*****"
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
