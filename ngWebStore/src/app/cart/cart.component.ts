import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocalDataService} from '../services/local-data.service';
import Cart from '../services/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  myCart : Cart[];
  cartTotal = 0.0;

  constructor(
    public localDataService: LocalDataService,
    public dataService: DataService,
    private router: Router) {   
  
  }

  ngOnInit() {  
    this.loadMyCart();
  }
  loadMyCart() {
    this.myCart = this.localDataService.GetMyCart();
    if (this.myCart == null || this.myCart == undefined || this.myCart.length==0)
      console.log('cart is empty! ,,, do some shopping!');
    else
      console.log(this.myCart);  
    
    
    this.getCartTotal();
  }

  getCartTotal() {
    var cartTotal_ = 0.0;
    this.myCart.map((item) => {
      cartTotal_ = cartTotal_ + item.qty * item.price;
    });
    var paymentAmount = cartTotal_.toFixed(2);
    console.log((Math.ceil(Number(paymentAmount) * 20 - 0.5)/20).toFixed(2));
    this.cartTotal = Number((Math.ceil(Number(paymentAmount) * 20 - 0.5) / 20).toFixed(2));
  }


}
