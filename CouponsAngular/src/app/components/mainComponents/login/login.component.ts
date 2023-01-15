import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/models/Login';
import { Observable } from 'rxjs';
import { loginService } from 'src/app/services/login-service/login.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private submitted = false;
  private loginFailed: string;
  private userLogin: Login;
  private userToken: string;
  private title: string;

  constructor(private formBuilder: FormBuilder,
    private loginService: loginService, private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$")]],
      password: ['', Validators.required]
    });
    this.dataService.activeUser.subscribe(userToken => this.userToken = userToken);
    this.title = "Login";
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    var userEmail = this.loginForm.controls['email'].value;
    var userPassword = this.loginForm.controls['password'].value;

    const observer: Observable<Login> = this.loginService.loginCheck(userEmail, userPassword);

    observer.subscribe(
      (res) => {

        this.loginFailed = "";
        this.dataService.changeData(res.loginToken);
        this.dataService.changeMessege(userEmail);
        
        switch (res.logInUserType) {
          case "AD":
            this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'admin-menu', headerOutlet: 'logout-icon' } }]);
            break;
          case "CO":
            this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'company-menu', headerOutlet: 'logout-icon' } }]);
            break;
          case "CU":
            this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'customer-menu', headerOutlet: 'logout-icon' } }]);
            break;
        }
      },
      (error) => {
        this.loginFailed = "Login failed, email or password are incorrect";
        setTimeout(() => {
          this.loginFailed = "";
        }, 5000);
      }
    );
  }
}