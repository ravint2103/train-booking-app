import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: any;
  constructor(public common: CommonService, private router: Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('currentUser');
  }

  myAccount() {
    this.router.navigateByUrl('my-account');
  }
}
