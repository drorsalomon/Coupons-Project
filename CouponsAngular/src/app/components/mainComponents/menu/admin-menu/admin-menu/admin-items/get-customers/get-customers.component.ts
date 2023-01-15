import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Customer } from 'src/app/models/Customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-customers',
  templateUrl: './get-customers.component.html',
  styleUrls: ['./get-customers.component.css']
})
export class GetCustomersComponent implements OnInit {

  private title: string;
  private userFeedback: string;
  private custList: Customer[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getCustomers();
    this.title = "Companies";
  }

  getCustomers() {

    const observer: Observable<Customer[]> = this.adminService.getCustomers();

    observer.subscribe(
      (res) => {
        this.custList = res
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! no customers currntly listed.";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      });
  }

}
