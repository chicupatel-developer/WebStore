import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';

@Component({
  selector: 'app-set-product-discount',
  templateUrl: './set-product-discount.component.html',
  styleUrls: ['./set-product-discount.component.css']
})
export class SetProductDiscountComponent implements OnInit {

  product;

  responseColor = '';
  apiResponse = '';

  form: FormGroup = new FormGroup({
    discountPercentage: new FormControl(''),
    discountQty: new FormControl(''),
    firstDateForDiscountedPrice: new FormControl(''),
    lastDateForDiscountedPrice: new FormControl(''),
  });
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.product = this.localDataService.getProduct();

    if (this.product == null || this.product == undefined) {
      this.router.navigate(['/admin-products']);
    }
    console.log(this.product);

    this.form = this.formBuilder.group(
      {
        discountPercentage: [
          '',
          [
            Validators.required,
          ]
        ],
        discountQty: [
          '',
          [
            Validators.required,
          ]
        ],
        firstDateForDiscountedPrice: [
          '',
          [
            Validators.required,
          ]
        ],
        lastDateForDiscountedPrice: [
          '',
          [
            Validators.required,
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
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


}
