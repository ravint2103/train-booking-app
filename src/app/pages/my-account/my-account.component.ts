import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit {
  userProfile: any = [];
  bookingHistory: any = [];

  constructor(public common: CommonService, public api: ApiService, private router: Router) { }

  ngOnInit() {
    let userName = localStorage.getItem('currentUser');
    this.userProfile = this.common.getAllUsers.find(x => (x.Name === userName))
    // console.log('Profile:', this.userProfile)
    this.bookingHistory = this.common.getBookingList;
    // console.log('Booking List:', this.common.getBookingList)
  }

  searchTrain() {
    this.router.navigateByUrl('reservation');
  }
}
