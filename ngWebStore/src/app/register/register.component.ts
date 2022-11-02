import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  }

}
