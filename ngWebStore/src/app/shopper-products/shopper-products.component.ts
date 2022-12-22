import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';
import Cart from '../services/cart';

@Component({
  selector: 'app-shopper-products',
  templateUrl: './shopper-products.component.html',
  styleUrls: ['./shopper-products.component.css']
})
export class ShopperProductsComponent implements OnInit {

  myCart = [];

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
    console.log('product is added to cart,,,', selectedProduct);
    
    this.myCart = this.localDataService.GetMyCart();

    var productToCart = {
      cartId: 1,
      productId: selectedProduct.id,
      title: selectedProduct.title
    };
    this.myCart.push(productToCart);

    this.localDataService.SetMyCart(this.myCart);

    console.log(this.localDataService.GetMyCart());

    // this will notify local-data-service
    // so in next step,,, it will notify header component
    this.localDataService.sendCartChangeNotification(this.myCart);
    
  }

}
