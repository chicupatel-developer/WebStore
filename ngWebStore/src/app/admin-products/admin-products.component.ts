import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products = [];
  productToDisplay;  
  
  public searchValue: string;
  
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {
    
    this.localDataService.svChanged
      .subscribe(res => {
        this.searchValue = res;
      });
  }


  ngOnInit() {  
    this.loadProducts();
  }
  loadProducts() {
    this.dataService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.log(error);
        });
  }

  // call back from child component
  onAddToCart(selectedProduct) {
    console.log('product is added to cart,,,',selectedProduct);
  }
}
