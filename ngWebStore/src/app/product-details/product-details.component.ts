import { Component, OnInit } from '@angular/core';
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

  product;

  constructor(public localDataService: LocalDataService,public dataService: DataService, private router: Router, private route: ActivatedRoute)
  { }
  ngOnInit(): void {
    this.product = history.state.data;
    if (this.product == null || this.product == undefined)
      this.router.navigate(['/shopper-products']);        
  }

}
