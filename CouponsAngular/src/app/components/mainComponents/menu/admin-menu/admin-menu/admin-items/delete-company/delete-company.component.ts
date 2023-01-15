import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Company } from 'src/app/models/Company';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delete-company',
  templateUrl: './delete-company.component.html',
  styleUrls: ['./delete-company.component.css']
})
export class DeleteCompanyComponent implements OnInit {

  private deleteCompForm: FormGroup;
  private userFeedback: string;
  private submitted = false;
  private compList: Company[];

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.deleteCompForm = this.formBuilder.group({
      id: ['', Validators.required],
    })
    this.getCompanies();
  }

  get f() { return this.deleteCompForm.controls; }

  getCompanies() {

    const observer: Observable<Company[]> = this.adminService.getCompanies();

    observer.subscribe(
      (res) => {
        this.compList = res
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! no companies currntly listed";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      });
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.deleteCompForm.invalid) {
      return;
    }

    var compId = this.deleteCompForm.controls['id'].value;
    
    const observer: Observable<Company> = this.adminService.deleteCompany(compId);

    observer.subscribe(
      (res) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(37, 153, 8)';
        this.userFeedback = "*****Company successfully deleted*****"
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      },
      (error) => {
        let userFeedback = document.getElementById("userFeedback");
        userFeedback.style.color = 'rgb(196, 17, 17)';
        this.userFeedback = "Error! company not found";
        setTimeout (() => {
          this.userFeedback = "";
       }, 5000);
      }
    );
  }

}
