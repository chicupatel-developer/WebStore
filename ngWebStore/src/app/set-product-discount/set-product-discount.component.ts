import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';
import DateValidation from '../services/date-validation';
import DiscountPercentageValidation from '../services/discont-percentage-validation';


@Component({
  selector: 'app-set-product-discount',
  templateUrl: './set-product-discount.component.html',
  styleUrls: ['./set-product-discount.component.css']
})
export class SetProductDiscountComponent implements OnInit {

  product;

  responseColor = '';
  apiResponse = '';
  errors = [];

  form: FormGroup = new FormGroup({
    discountPercentage: new FormControl(''),
    discountQty: new FormControl(''),
    firstDateForDiscountedPrice: new FormControl(''),
    lastDateForDiscountedPrice: new FormControl(''),
  });
  submitted = false;

  discountedPrice;
  
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
      {
        validators: [
          DateValidation.match('firstDateForDiscountedPrice', 'lastDateForDiscountedPrice'),
          DiscountPercentageValidation.match('discountPercentage')
        ],
      }
    );
  }

  ngOnDestroy() {
    console.log('reset-product@local-data-service,,,');
    this.localDataService.setProduct(null);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  setDiscountedPrice(e) {
    this.discountedPrice = (Math.ceil((this.product.price - (Number(this.form.value["discountPercentage"]) * this.product.price) / 100) * 20 - 0.5) / 20).toFixed(2);
  } 

  numberOnly(event, param): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
  
    // 0 = numbers and decimals
    if (param == 0) {
      // numbers and decimals
      if (event.key == '.') {
        return true;
      }
      else {
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
      }
    }
    else {
      // numbers only
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
  }
  
  onSubmit(): void {
    this.responseColor = '';
    this.apiResponse = '';
    this.errors = [];
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value);

    var discountStartDate = this.form.value["firstDateForDiscountedPrice"];
    var dsdate = new Date(discountStartDate);
    dsdate.setHours(0, 0, 0);   // Set hours, minutes and seconds
   
    var discountEndDate = this.form.value["lastDateForDiscountedPrice"];
    var dedate = new Date(discountEndDate);
    dedate.setHours(0, 0, 0);   // Set hours, minutes and seconds
     
    var productDiscount = {
      productId: this.product.id,
      price: Number(this.product.price),
      discountedPrice: Number(this.discountedPrice),
      discountPercentage: Number(this.form.value["discountPercentage"]),
      discountQty: Number(this.form.value["discountQty"]),
      firstDateForDiscountedPrice: new Date(dsdate.toUTCString() + "-0500 (Central Standard Time)"),
      lastDateForDiscountedPrice: new Date(dedate.toUTCString() + "-0500 (Central Standard Time)"),
    };
    console.log(productDiscount);


    this.dataService.addProductDiscount(productDiscount)
      .subscribe(
        data => {
          console.log(data);
          this.responseColor = 'green';
          this.apiResponse = data.responseMessage;
          setTimeout(() => {
            this.onReset();
          }, 3000);
        },
        error => {
          console.log(error);
          this.responseColor = 'red';
          if (error.status === 400) {
            if (error.error && error.error != null) {
              if (error.error.response && error.error.response.responseCode === 400) {
                this.apiResponse = error.error.response.responseCode + ' : ' + error.error.response.responseMessage;
              }
              else {
                this.errors = this.localDataService.display400andEx(error, 'Set-Product-Discount');  
              }              
            }
          }
          else if (error.status === 500) {
            this.apiResponse = error.error.responseMessage;
          }
        });

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.discountedPrice = undefined;
    this.errors = [];
    this.apiResponse = '';
    this.responseColor = '';
  }
}
