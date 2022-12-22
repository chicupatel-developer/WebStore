import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  myCart = [];
  
  product;

  constructor(public localDataService: LocalDataService,public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }
  ngOnInit(): void {
    this.product = history.state.data;
    if (this.product == null || this.product == undefined)
      this.router.navigate(['/shopper-products']);        
  }

  addToCart(selectedProduct) {
    console.log('child-component,,,product is adding to cart,,,',selectedProduct);
    
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
