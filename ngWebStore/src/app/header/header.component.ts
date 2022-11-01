import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isUserAuthenticated: boolean;
  public userName: string;
  public token: string;
  public role: string;

  constructor(public _localService: LocalDataService, public _userService: UserService, private _router: Router) {
    this._userService.authChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
    });
     this._userService.unChanged
      .subscribe(res => {
        this.userName = res;
    })
  }

  ngOnInit(): void {
    
    console.log('getting is-authenticated and user-name values,,,');
  
    this.isUserAuthenticated = (localStorage.getItem("isAuthenticated") =="true"); 
    this.userName = localStorage.getItem("userName");
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("role");
    console.log(this.isUserAuthenticated,':', this.userName,',,,', this.role, ',,,', this.token);   
  }

  logout() {
    this.isUserAuthenticated = false;
    this._userService.doLogout();
  }
  
}