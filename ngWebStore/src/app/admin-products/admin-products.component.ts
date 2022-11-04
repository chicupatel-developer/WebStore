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
