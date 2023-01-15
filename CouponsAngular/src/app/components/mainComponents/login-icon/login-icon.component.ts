import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-icon',
  templateUrl: './login-icon.component.html',
  styleUrls: ['./login-icon.component.css']
})
export class LoginIconComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loadLogin() {
    this.router.navigate([{ outlets: { primary: 'login', menuOutlet: 'defmenu' } }]);
  }
}