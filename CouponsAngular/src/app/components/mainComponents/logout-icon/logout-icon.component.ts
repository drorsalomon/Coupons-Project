import { Component, OnInit } from '@angular/core';
import { loginService } from 'src/app/services/login-service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service/data.service';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-logout-icon',
  templateUrl: './logout-icon.component.html',
  styleUrls: ['./logout-icon.component.css']
})
export class LogoutIconComponent implements OnInit {

  private userEmail: string;
  private messege: string;

  constructor(private loginService: loginService, private router: Router,
    private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.activeUser.subscribe(Email => this.userEmail = Email);
    this.messege = "friend :)"
  }


  logout() {
    const observer: Observable<Login> = this.loginService.logOut(this.userEmail);

    observer.subscribe(
      (res) => {
        this.router.navigate([{ outlets: { primary: 'homepage', menuOutlet: 'defmenu', headerOutlet: 'login-icon' } }]);
        this.dataService.changeData(this.messege);
      },
      (error) => {
        alert("Unable to logout!")
      }
    );
  }
}