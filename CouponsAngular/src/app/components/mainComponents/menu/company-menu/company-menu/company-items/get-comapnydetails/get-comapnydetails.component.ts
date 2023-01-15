import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-comapnydetails',
  templateUrl: './get-comapnydetails.component.html',
  styleUrls: ['./get-comapnydetails.component.css']
})
export class GetComapnydetailsComponent implements OnInit {

  private title: string;
  private userFeedback: string;
  private company: Company;
  private userToken: string;

  constructor(private companyService: CompanyService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken)
    this.title = "Company details";
    this.getCompany();
  }

  getCompany() {

    const observer: Observable<Company> = this.companyService.getCompanyDetails(this.userToken);

    observer.subscribe(
      (res) => {
        this.company = res;
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! company not found";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
    }
}
