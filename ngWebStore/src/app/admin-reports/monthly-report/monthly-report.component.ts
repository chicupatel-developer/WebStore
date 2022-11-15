import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  years = [];
  products = [];

  displayProductList = false;
  selectedProduct;
  selectedYear="";
  
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {  
  }
 
  ngOnInit() {  

    this.years = this.localDataService.getYears();

    if (this.localDataService.getProducts() == null)
      this.loadProducts();    
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

    var monthlyProductSales = {
      year: Number(this.selectedYear),
      productId: this.selectedProduct.id
    };

    console.log(monthlyProductSales);
    this.getMonthlyProductSalesData(monthlyProductSales);
  }
 

  changeYear(event) {
    console.log(event.target.value);
    this.selectedYear = event.target.value;

    this.selectedProduct = null;
  }

  getMonthlyProductSalesData(monthlyProductSales) {
    this.dataService.getMonthlyProductSales(monthlyProductSales)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
