import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginBlock = true;
  submitted = false;
  userName: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private formBuilder: FormBuilder, private router: Router, public common: CommonService, public api: ApiService) { }

  ngOnInit() {

    // Login Form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.pattern(this.emailPattern)],
      password: ['', Validators.required]
    });

    //Register Form
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.pattern(this.emailPattern)],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }
  goToRegiser() {
    this.isLoginBlock = false;
  }
  goToLogin() {
    this.isLoginBlock = true;
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }

  get rf() {
    return this.registerForm.controls;
  }

  doRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let postData = {
      "id": this.common.getAllUsers.length + 1,
      "Name": this.registerForm.value.name,
      "Email": this.registerForm.value.email,
      "Mobile": this.registerForm.value.mobile,
      "Password": this.registerForm.value.password,
      "Confirmpassword": this.registerForm.value.confirmpassword
    };

    if (this.registerForm.value.password !== this.registerForm.value.confirmpassword) {
      alert("Password and Confirm password mismatched");
      return;
    }
    const user = this.common.getAllUsers.find(x => x.Email === this.registerForm.value.email);
    if (user) {
      alert("This email already registered!");
      return;
    }

    let requestURL = this.api.rootUrl;
    let headerOptions = this.api.commonHeaders("");
    this.api.doPOST(requestURL + 'userdetails', postData, headerOptions).subscribe(
      (result: any) => {
        // console.log("Success!", result);
        alert("Successfully Registered!");
      },
      (error: any) => {
        console.log(error);
      })
  }

  doLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const user = this.common.getAllUsers.find(x => x.Email === this.loginForm.value.email && x.Password === this.loginForm.value.password);

    if (!user) {
      alert("Username or password is incorrect");
    } else {
      alert("login success");
      localStorage.setItem('isLoggedIn', "True");
      localStorage.setItem('currentUser', user.Name);
      this.router.navigateByUrl('/reservation');
    }
  }
}
