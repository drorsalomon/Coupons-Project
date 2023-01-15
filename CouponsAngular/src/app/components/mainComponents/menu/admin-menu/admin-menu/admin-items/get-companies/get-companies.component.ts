import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-companies',
  templateUrl: './get-companies.component.html',
  styleUrls: ['./get-companies.component.css']
})
export class GetCompaniesComponent implements OnInit {

  private title: string;
  private userFeedback: string;
  private compList: Company[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getCompanies();
    this.title = "Companies";
  }

  getCompanies() {

    const observer: Observable<Company[]> = this.adminService.getCompanies();

    observer.subscribe(
      (res) => {
        this.compList = res
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! no companies currntly listed.";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      });
  }
}
