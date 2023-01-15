import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Coupon } from 'src/app/models/Coupon';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  private addCouponForm: FormGroup;
  private title: string;
  private userFeedback: string;
  private submitted = false;
  private userToken: string;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private dataService: DataService) { }

  ngOnInit() {
    this.addCouponForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      img: ['', Validators.required]
    })
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.title = "Create coupon";
  }

  get f() { return this.addCouponForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addCouponForm.invalid) {
      return;
    }

    var title = this.addCouponForm.controls['title'].value;
    var category = this.addCouponForm.controls['category'].value;
    var amount = this.addCouponForm.controls['amount'].value;
    var price = this.addCouponForm.controls['price'].value;
    var description = this.addCouponForm.controls['description'].value;
    var date = this.addCouponForm.controls['date'].value;
    var img = this.addCouponForm.controls['img'].value;

    const observer: Observable<Coupon> = this.companyService.addCoupon(this.userToken, title, category, amount, price, description, date, img);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Coupon successfully created*****"
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
