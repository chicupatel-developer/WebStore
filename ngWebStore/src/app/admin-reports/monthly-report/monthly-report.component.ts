import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../../services/local-data.service';
import { ChartType } from 'angular-google-charts';

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

  salesData = [];

  // google-chart-api
  // line chart
  title = "Monthly Sales Data : Year - ";
  lineChart = ChartType.LineChart;
  data: any[] = [];
  columnNames = ['Month', 'Sales'];
  width = 600;
  height = 400;
  lineOptions = {
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Sales'
    },
  };
 
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
          this.setChartDataForSales(data);
        },
        error => {
          console.log(error);
        });
  }

  setChartDataForSales(data) {
    var myData = [];
    for (var i = 0; i <= 11; i++){
      var myDataPart = [];
      myDataPart.push(data.months[i]);
      myDataPart.push(data.sales[i]);
      myData.push(myDataPart);
    }
    this.salesData = [...myData];
    // this.data = this.salesData;
  }
}
