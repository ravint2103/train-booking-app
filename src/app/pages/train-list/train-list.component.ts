import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  availableTrains: any = [];
  bookForm: FormGroup;
  submitted = false;
  constructor(public api: ApiService, private formBuilder: FormBuilder, public common: CommonService, private router: Router) { }

  ngOnInit() {
    this.availableTrains = this.common.getAvailableTrainList;

    // Booking Form
    this.bookForm = this.formBuilder.group({
      fromStation: ['', Validators.required],
      toStation: ['', Validators.required],
      trainNumber: ['', Validators.required],
      trainName: ['', Validators.required],
      date: ['', Validators.required],
      availableSeats: [''],
      ratePerSeat: [''],
      adults: ['', Validators.required],
      kids: [''],
      TotalAmount: ['']
    });
  }


  get bf() {
    return this.bookForm.controls;
  }

  bookNow(item) {
    // console.log('Booking Details:', item, item.Date);
    this.bookForm = this.formBuilder.group({
      fromStation: new FormControl(item.FromStation),
      toStation: new FormControl(item.ToStation),
      trainNumber: new FormControl(item.TrainNo),
      trainName: new FormControl(item.TrainName),
      date: new FormControl(item.Date),
      availableSeats: new FormControl(item.AvailableSeats),
      ratePerSeat: new FormControl(item.RateforOneSeat),
      adults: ['', Validators.required],
      kids: [''],
      TotalAmount: ['']
    });
  }
  onSubmit() {
    debugger;
    this.common.getAvailableTrainList;

    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }

    let requestUrl = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    let grandTotal = (this.bookForm.value.ratePerSeat * this.bookForm.value.adults) + (this.bookForm.value.ratePerSeat * (this.bookForm.value.kids / 2));
    let seats = this.bookForm.value.availableSeats - (this.bookForm.value.adults + this.bookForm.value.kids)
    // console.log('Seats:', seats, grandTotal);

    let postData = {
      "id": this.common.getBookingList.length + 1,
      "FromStation": this.bookForm.value.fromStation ? this.bookForm.value.fromStation : '',
      "ToStation": this.bookForm.value.toStation ? this.bookForm.value.toStation : '',
      "TrainNumber": this.bookForm.value.trainNumber ? this.bookForm.value.trainNumber : '',
      "TrainName": this.bookForm.value.trainName ? this.bookForm.value.trainName : '',
      "Date": this.bookForm.value.date ? this.bookForm.value.date : '',
      "AvailableSeats": seats,
      "RatePerSeat": this.bookForm.value.ratePerSeat ? this.bookForm.value.ratePerSeat : '',
      "Adults": this.bookForm.value.adults ? this.bookForm.value.adults : '0',
      "Kids": this.bookForm.value.kids ? this.bookForm.value.kids : '0',
      "TotalAmount": grandTotal,
      "Status": true
    };

    this.bookForm = this.formBuilder.group({
      TotalAmount: new FormControl(grandTotal),
      AvailableSeats: new FormControl(seats)
    })

    this.api.doPOST(requestUrl + 'bookingdetails', postData, headerOptions).subscribe((result: any) => {
      alert('Successfully Booked!')
      // console.log('Success!', result)
      this.closebutton.nativeElement.click();
    },
      (error: any) => {
        alert('Please try again!')
        console.log(error);
      })
  }

  searchTrain() {
    this.router.navigateByUrl('reservation');
  }
}