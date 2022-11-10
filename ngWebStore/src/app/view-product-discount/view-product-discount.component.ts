import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';
import DateValidation from '../services/date-validation';
import DiscountPercentageValidation from '../services/discont-percentage-validation';

@Component({
  selector: 'app-view-product-discount',
  templateUrl: './view-product-discount.component.html',
  styleUrls: ['./view-product-discount.component.css']
})
export class ViewProductDiscountComponent implements OnInit {

  product;
  
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
  }

  ngOnDestroy() {
    console.log('reset-product@local-data-service,,,');
    this.localDataService.setProduct(null);
  }
}
