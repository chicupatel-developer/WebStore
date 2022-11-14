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
  discountData;
  discountZoneSales;
  productDiscountId=undefined;

  // paging
  page: number = 1;
  count: number = 0;
  tableSize: number = 50;
  tableSizes: any = [3, 6, 9, 12];
  onTableDataChange(event: any) {
    this.page = event;
    this.loadTestResults();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadTestResults();
  }
  loadTestResults() {     
    this.getProductDiscountData();
  }
  
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

    this.getProductDiscountData();
  }

  ngOnDestroy() {
    console.log('reset-product@local-data-service,,,');
    this.localDataService.setProduct(null);
  }

  getProductDiscountData() {
    this.dataService.getProductDiscountData(this.product.id)
      .subscribe(
        data => {          
          this.setDiscountStatus(data);
        },
        error => {
          console.log(error);
        });
  }

  setDiscountStatus(data) {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    console.log(currentDate);

    data.forEach((prDis) => {
      if (
        currentDate.getTime() >=
        new Date(prDis.firstDateForDiscountedPrice).setHours(0, 0, 0, 0) &&
        currentDate.getTime() <=
        new Date(prDis.lastDateForDiscountedPrice).setHours(0, 0, 0, 0)
      ) {
        // discount scheme is still ACTIVE/RUNNING
        prDis.discountStatus = "RUNNING";
      } else {
        // discount either EXPIRED or COMING-SOON
        if (
          currentDate.getTime() >
          new Date(prDis.lastDateForDiscountedPrice).setHours(0, 0, 0, 0)
        )
          prDis.discountStatus = "EXPIRED";
        if (
          currentDate.getTime() <
          new Date(prDis.firstDateForDiscountedPrice).setHours(0, 0, 0, 0)
        )
          prDis.discountStatus = "COMING-SOON";
      }
    });
    console.log(data);

    this.discountData = data;
  }

  getDiscountZoneProductSales(selectedProduct) {
    this.productDiscountId = selectedProduct.productDiscountId;
    
    var data = {
      productId: selectedProduct.productId,
      discountStartDate: selectedProduct.firstDateForDiscountedPrice,
      discountEndDate: selectedProduct.lastDateForDiscountedPrice,
      id: selectedProduct.productDiscountId,
    };
    console.log(data);


    this.dataService.getDiscountZoneProductSales(data)
      .subscribe(
        data => {
          console.log(data);
          this.discountZoneSales = { ...data };
        },
        error => {
          console.log(error);
        });
  }
}
