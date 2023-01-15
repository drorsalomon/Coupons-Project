import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  private deleteCustForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private custList: Customer[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.deleteCustForm = this.formBuilder.group({
      id: ['', Validators.required],
    })
    this.getCustomers();
  }

  get f() { return this.deleteCustForm.controls; }

  getCustomers() {

    const observer: Observable<Customer[]> = this.adminService.getCustomers();

    observer.subscribe(
      (res) => {
        this.custList = res
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! no customers currntly listed";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      });
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.deleteCustForm.invalid) {
      return;
    }

    var custId = this.deleteCustForm.controls['id'].value;
    
    const observer: Observable<Customer> = this.adminService.deleteCustomer(custId);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Customer successfully deleted*****"
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! customer not found";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      }
    );
  }


}
