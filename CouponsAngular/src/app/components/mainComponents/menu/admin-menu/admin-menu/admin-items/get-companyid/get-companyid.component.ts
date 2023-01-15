import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-get-companyid',
  templateUrl: './get-companyid.component.html',
  styleUrls: ['./get-companyid.component.css']
})
export class GetCompanyidComponent implements OnInit {

  private getidCompForm: FormGroup;
  private userFeedback: string;
  private display: string;
  private submitted = false;
  private company: Company;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.getidCompForm = this.formBuilder.group({
      id: ['', Validators.required],
    })
  }

  get f() { return this.getidCompForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.getidCompForm.invalid) {
      return;
    }

    var compId = this.getidCompForm.controls['id'].value;
    
    const observer: Observable<Company> = this.adminService.getCompanyById(compId);

    observer.subscribe(
      (res) => {
        this.company = res;
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
