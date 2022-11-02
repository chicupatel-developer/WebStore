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
  
  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) { }


  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.dataService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
