import { Component, OnInit } from '@angular/core';
import { CommonService } from './service/common.service';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Train Booking Applcation';

  constructor(public common: CommonService, public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllDetails();
    this.getAllBooking();

    let loginStatus = localStorage.getItem('isLoggedIn');
    // console.log('Status:', loginStatus);
    if (!loginStatus) {
      this.router.navigateByUrl('login');
    }
    else {
      this.router.navigateByUrl('reservation');
    }
  }

  getAllDetails() {
    let requestURL = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    this.api.doGet(requestURL + 'userdetails', headerOptions).subscribe(data => {
      this.common.getAllUsers = data;
    })
  }

  getAllBooking() {
    let rootUrl = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    this.api.doGet(rootUrl + 'bookingdetails', headerOptions).subscribe(data => {
      this.common.getBookingList = data;
    })
  }
}
