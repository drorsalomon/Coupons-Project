import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-get-customerid',
  templateUrl: './get-customerid.component.html',
  styleUrls: ['./get-customerid.component.css']
})
export class GetCustomeridComponent implements OnInit {

  private getidCustForm: FormGroup;
  private userFeedback: string;
  private display: string;
  private submitted = false;
  private customer: Customer;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.getidCustForm = this.formBuilder.group({
      id: ['', Validators.required],
    })
  }

  get f() { return this.getidCustForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.getidCustForm.invalid) {
      return;
    }

    var custId = this.getidCustForm.controls['id'].value;
    
    const observer: Observable<Customer> = this.adminService.getCustomerById(custId);

    observer.subscribe(
      (res) => {
        this.customer = res;
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
