
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public rootUrl = "http://localhost:3000/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  // for CRUD
  doGet(url?: any, headerOptions?: any) {
    return this.http.get(url, headerOptions);
  }

  doPOST(url?: any, postBody?: any, headerOptions?: any) {
    return this.http.post(url, postBody, headerOptions);
  }

  doPUT(url?: any, postBody?: any, headerOptions?: any) {
    return this.http.put(url, postBody, headerOptions);
  }

  doDELETE(url?: any, headerOptions?: any) {
    return this.http.delete(url, headerOptions);
  }

  commonHeaders(type: any) {
    if (type == "token") {
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Token ' + this.userInfo.token
      });

      let headerOptions = {
        headers: httpHeaders
      };

      return headerOptions;
    }
    else {
      let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      let headerOptions = {
        headers: httpHeaders
      };

      return headerOptions;
    }

  }

}
