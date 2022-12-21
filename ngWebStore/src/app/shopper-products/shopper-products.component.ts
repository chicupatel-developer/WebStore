import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';


@Component({
  selector: 'app-shopper-products',
  templateUrl: './shopper-products.component.html',
  styleUrls: ['./shopper-products.component.css']
})
export class ShopperProductsComponent implements OnInit {

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

        if (this.searchValue !== '' && this.searchValue !== null && this.searchValue !== undefined) {         
          this.filterProducts(this.searchValue);
        }
        else {
          this.loadProducts();
        }
      });
  }

  filterProducts(searchValue) {    
    var filterProducts_ = this.localDataService.getProducts().filter((p) =>
      p.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    this.products = [...filterProducts_];
  }

  ngOnInit() {  
    this.loadProducts();
  }
  loadProducts() {
    if (this.localDataService.getProducts() != null) {
      console.log('getting products from local-service');
      this.products = this.localDataService.getProducts();
    }
    else {
      console.log('getting products from api');
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
  
  }

  // call back from child component
  onAddToCart(selectedProduct) {
    console.log('product is added to cart,,,',selectedProduct);
  }

}
