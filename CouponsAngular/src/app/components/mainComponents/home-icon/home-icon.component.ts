import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.css']
})
export class HomeIconComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  loadHomepage()
  {
    this.router.navigate([{outlets: {primary: 'homepage'}}]);
  }
}
