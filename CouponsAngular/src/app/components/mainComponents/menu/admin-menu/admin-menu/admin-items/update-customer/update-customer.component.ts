import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  private updateCustForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private custList: Customer[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.updateCustForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")],
      password: [''],
      name: [''],
      lname: ['']
    })
    this.getCustomers();
  }

  get f() { return this.updateCustForm.controls; }

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

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.updateCustForm.invalid) {
      return;
    }

    var custId = this.updateCustForm.controls['id'].value;
    var custEmail = this.updateCustForm.controls['email'].value;
    var custPassword = this.updateCustForm.controls['password'].value;
    var custName = this.updateCustForm.controls['name'].value;
    var custLastName = this.updateCustForm.controls['lname'].value;

    const observer: Observable<Customer> = this.adminService.updateCustomer(custId, custEmail, custPassword, custName, custLastName);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Customer successfully updated*****"
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! one of the details entered is incorrect";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      }
    );
  }
}
