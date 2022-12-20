import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-discount-trend-report',
  templateUrl: './discount-trend-report.component.html',
  styleUrls: ['./discount-trend-report.component.css']
})
export class DiscountTrendReportComponent implements OnInit {
  products = [];

  displayProductList = false;
  selectedProduct;

  // google-chart-api
  chartData;
  selectedOption;
 
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {  
  }
 
  ngOnInit() {  
    if (this.localDataService.getProducts() == null)
      this.loadProducts();
    else
      this.products = this.localDataService.getProducts();  
  }
  loadProducts() {
    console.log('api call to get products,,,');
    this.dataService.getAllProducts()
      .subscribe(
        data => {        
          this.localDataService.setProducts(data);
          this.products = this.localDataService.getProducts();
        },
        error => {
          console.log(error);
        });
  }
  
  productSelected(selectedProduct) {
    console.log(selectedProduct.title);
    this.displayProductList = false;
    this.selectedProduct = selectedProduct;

    var discountTrendSales = {
      productId: this.selectedProduct.id
    };

    console.log(discountTrendSales);
    this.getLast5DiscountZoneProductSales(discountTrendSales);
  }

  getLast5DiscountZoneProductSales(discountTrendSales) {
    this.dataService.getLast5DiscountZoneProductSales(discountTrendSales)
      .subscribe(
        data => {
          console.log(data);
          this.chartData = data;
          this.selectedOption = 'Discount-Trend';
        },
        error => {
          console.log(error);
        });
  } 

}
