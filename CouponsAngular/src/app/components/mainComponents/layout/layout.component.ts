import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from 'src/app/services/login-service/login.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  private userEmail: string;

  constructor(private loginService: loginService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'defmenu', headerOutlet: 'login-icon' } }]);
    this.dataService.activeUser.subscribe(Email => this.userEmail = Email);
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (this.userEmail != "friend :)") {
      this.logout();
    }
  }

  logout() {
    const observer: Observable<Login> = this.loginService.logOut(this.userEmail);

    observer.subscribe(
      (res) => {
        this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'defmenu', headerOutlet: 'login-icon' } }]);
      },
      (error) => {
        alert("Unable to logout!")
      }
    );
  }
}
