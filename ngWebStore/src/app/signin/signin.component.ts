import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit { 

  responseColor = '';
  apiResponse = '';
  errors: string[];

  form: FormGroup = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
  });
  submitted = false;
  signinModel = {
    userName: '',
    password: ''
  };

  constructor(
    public localDataService: LocalDataService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this.userService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
   
    this.form = this.formBuilder.group(
      {
        UserName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],      
      },     
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.responseColor = '';
    this.apiResponse = '';
    this.errors = [];

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.signinModel.userName = this.form.value["UserName"];
    this.signinModel.password = this.form.value["Password"];
    // this.signinModel.password = null;
      
    console.log(this.signinModel);

    // api call
    this.userService.signin(this.signinModel).subscribe(
      (res: any) => {
        console.log(res);

        this.responseColor = 'green';
        this.apiResponse = res.response.responseCode + ':' + res.response.responseMessage;
      
        //// get role info
        console.log('my role : ' + res.myRole);
        let jwtData = res.token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        console.log('jwtData: ' + jwtData);
        console.log('decodedJwtJsonData: ' + decodedJwtJsonData);
        console.log('decodedJwtData: ' + decodedJwtData);
        //// get role info // end

        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('role', res.myRole);
        localStorage.setItem("isAuthenticated", JSON.stringify(true));

        // this will notify user-service
        // so in next step,,, it will notify header component
        this.userService.sendAuthStateChangeNotification(true, this.signinModel.userName);

        // redirect to home page
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);

      },
      error => {
        console.log(error);
        this.responseColor = 'red';

        if (error.status === 400) {
          if (error.error.errors && error.error.errors != null) {
            this.errors = this.localDataService.display400andEx(error,'Login');
          }
          else {
            this.apiResponse = error.error.response.responseCode + ' : ' + error.error.response.responseMessage;          
          }
        }
      }
    );   
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.responseColor = '';
    this.apiResponse = '';
    this.errors = [];
  }
}