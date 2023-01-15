import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  private addCompForm: FormGroup;
  private title: string;
  private userFeedback: string;
  private submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.addCompForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    })
    this.title = "Create company"
  }

  get f() { return this.addCompForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.addCompForm.invalid) {
      return;
    }

    var compEmail = this.addCompForm.controls['email'].value;
    var compPassword = this.addCompForm.controls['password'].value;
    var compName = this.addCompForm.controls['name'].value;

    const observer: Observable<Company> = this.adminService.addCompany(compEmail, compPassword, compName);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Company successfully created*****"
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! email or company name already exists";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      }
    );
  }
}
