import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private currentTime: Date;
  private headerText: string;
  private userEmail: string;
  private welcome: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    this.headerText = "Sobaka & Friends Coupons";
    this.welcome = "Welcome "
    this.dataService.activeUser1.subscribe(Email => this.userEmail = Email);
  }
}