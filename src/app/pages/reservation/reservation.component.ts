import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reserveForm: FormGroup;
  submitted = false;
  trainList: any = [];
  citylist: any = [];

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, public common: CommonService) { }

  ngOnInit() {
    // Get CityList
    this.getCityList();

    this.reserveForm = this.formBuilder.group({
      fromStation: ['', Validators.required],
      toStation: ['', Validators.required],
      journeyDate: ['', Validators.required]
    });
  }

  getCityList() {
    let requestURL = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    this.api.doGet(requestURL + 'citylist', headerOptions).subscribe(
      (result: any) => {
        this.citylist = result;
      },
      (error: any) => {
        console.log(error);
      })
  }

  autoComplete(e): void {
    let name = e.target.value;
    let list = this.citylist.filter(x => x.CityName === name)[0];
  }

  get f() {
    return this.reserveForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.reserveForm.invalid) {
      return;
    }

    if (this.reserveForm.value.fromStation === this.reserveForm.value.toStation) {
      alert('Please choose correct station');
      return;
    }

    let searchData = {
      "FromStation": this.reserveForm.value.fromStation,
      "ToStation": this.reserveForm.value.toStation,
      "Date": this.reserveForm.value.journeyDate
    };

    let requestURL = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    this.api.doGet(requestURL + 'availabletrainlists', headerOptions).subscribe(
      (result: any) => {
        // console.log("Success!", result);
        this.trainList = result;
        // debugger;
        this.common.getAvailableTrainList = result.filter(x => (x.FromStation === this.reserveForm.value.fromStation) || x.ToStation === this.reserveForm.value.toStation);
        // console.log("Train List:", this.common.getAvailableTrainList);
        if (!this.common.getAvailableTrainList) {
          alert('No trains available');
        }
        this.router.navigateByUrl('/train-list');

      },
      (error: any) => {
        console.log(error);
      })
  }

}
