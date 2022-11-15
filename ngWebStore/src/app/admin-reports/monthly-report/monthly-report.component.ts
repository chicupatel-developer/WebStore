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

  products = [];

  displayProductList = false;
  selectedProduct;
  
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {  
  }
 
  ngOnInit() {  

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
    this.displayProductList = true;
  }
  productSelected(selectedProduct) {
    console.log(selectedProduct.title);
    this.displayProductList = false;
    this.selectedProduct = selectedProduct;
  }
 
}
