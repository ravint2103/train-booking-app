import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getAllData: any = [];
  getAllUsers: any = [];
  getAvailableTrainList: any = [];
  getBookingList: any = [];

  constructor() { }

}
