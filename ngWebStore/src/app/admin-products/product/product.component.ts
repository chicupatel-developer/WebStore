import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productToDisplay;  
  @Output() onAddToCart = new EventEmitter();

  constructor(
    public router: Router,
  ) { }


  ngOnInit(): void {
  }

  addToCart(selectedProduct) {
    console.log('child-component,,,product is adding to cart,,,',selectedProduct);
    this.onAddToCart.emit(selectedProduct);
  }

  getProductDetails(selectedProduct) {
    console.log('getting product details,,,', selectedProduct);
  }
  
}
