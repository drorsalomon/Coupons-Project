import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer-service/customer.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-customerdetails',
  templateUrl: './get-customerdetails.component.html',
  styleUrls: ['./get-customerdetails.component.css']
})
export class GetCustomerdetailsComponent implements OnInit {

  private title: string;
  private userFeedback: string;
  private customer: Customer;
  private userToken: string;

  constructor(private customerService: CustomerService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeUser.subscribe(Token => this.userToken = Token)
    this.title = "Customer details";
    this.getCustomer();
  }

  getCustomer() {

    const observer: Observable<Customer> = this.customerService.getCustomerDetails(this.userToken);

    observer.subscribe(
      (res) => {
        this.customer = res;
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! customer not found";
        setTimeout(() => {
          this.userFeedback = "";
        }, 5000);
      }
    );
    }

}
