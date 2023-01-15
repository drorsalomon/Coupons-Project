import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  private addCustForm: FormGroup;
  private title: string;
  private userFeedback: string;
  private submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.addCustForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lname: ['', Validators.required]
    })
    this.title = "Create customer"
  }

  get f() { return this.addCustForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addCustForm.invalid) {
      return;
    }

    var custEmail = this.addCustForm.controls['email'].value;
    var custPassword = this.addCustForm.controls['password'].value;
    var custName = this.addCustForm.controls['name'].value;
    var custLastName = this.addCustForm.controls['lname'].value;
    const observer: Observable<Customer> = this.adminService.addCustomer(custEmail, custPassword, custName, custLastName);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Customer successfully created*****"
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! email already exists";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      }
    );
  }
}
