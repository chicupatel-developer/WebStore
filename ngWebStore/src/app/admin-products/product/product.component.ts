import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {LocalDataService} from '../../services/local-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productToDisplay;  
 
  constructor(
    public router: Router,
    public localDataService: LocalDataService,
  ) { }


  ngOnInit(): void {
  }

  viewDiscount(selectedProduct) {
    console.log('view product-discount,,,', selectedProduct);
    this.localDataService.setProduct(selectedProduct);
    setTimeout(() => {
      this.router.navigate(['/view-product-discount']);
    }, 1000);
  }

  setDiscount(selectedProduct) {
    console.log('setting product-discount,,,', selectedProduct);
    this.localDataService.setProduct(selectedProduct);
    setTimeout(() => {
      this.router.navigate(['/set-product-discount']);
    }, 1000);
  }
  
}
