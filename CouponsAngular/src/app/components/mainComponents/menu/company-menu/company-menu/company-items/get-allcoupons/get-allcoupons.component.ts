import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-allcoupons',
  templateUrl: './get-allcoupons.component.html',
  styleUrls: ['./get-allcoupons.component.css']
})
export class GetAllcouponsComponent implements OnInit {

  private userToken: string;
  private couponList: Coupon[];
  private title: string;
  private userFeedback: string;

  constructor(private companyService: CompanyService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.title = "Coupons";
    this.getCompanyCoupons()
  }

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

}
