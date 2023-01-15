import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  private updateCompForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private compList: Company[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.updateCompForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")],
      password: [''],
    })
    this.getCompanies();
  }

  get f() { return this.updateCompForm.controls; }

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

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.updateCompForm.invalid) {
      return;
    }

    var compId = this.updateCompForm.controls['id'].value;
    var compEmail = this.updateCompForm.controls['email'].value;
    var compPassword = this.updateCompForm.controls['password'].value;

    const observer: Observable<Company> = this.adminService.updateCompany(compId, compEmail, compPassword);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Company successfully updated*****"
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
