import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-quarterly-report',
  templateUrl: './quarterly-report.component.html',
  styleUrls: ['./quarterly-report.component.css']
})
export class QuarterlyReportComponent implements OnInit {
  
  years = [];
  products = [];

  displayProductList = false;
  selectedProduct;
  selectedYear="";

  // google-chart-api
  chartData;
  selectedOption;
 
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {  
  }
 
  ngOnInit() {  
    this.years = this.localDataService.getYears();

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

  showProductList() {
    if (this.selectedYear == "")
      return;
    
    this.displayProductList = true;
  }
  productSelected(selectedProduct) {
    console.log(selectedProduct.title);
    this.displayProductList = false;
    this.selectedProduct = selectedProduct;

    var quarterlyProductSales = {
      year: Number(this.selectedYear),
      productId: this.selectedProduct.id
    };

    console.log(quarterlyProductSales);
    this.getQuarterlyProductSalesData(quarterlyProductSales);
  }
 
  changeYear(event) {
    console.log(event.target.value);
    this.selectedYear = event.target.value;

    this.selectedProduct = null;
  }

  getQuarterlyProductSalesData(quarterlyProductSales) {
    this.dataService.getQuarterlyProductSales(quarterlyProductSales)
      .subscribe(
        data => {
          console.log(data);
          this.chartData = data;
          this.selectedOption = 'Quarter';
          console.log(this.chartData);
        },
        error => {
          console.log(error);
        });
  } 

}
