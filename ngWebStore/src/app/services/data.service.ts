import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44309/api';
  public ADMIN = `${this.API}/Admin`;
  public FAKE_API_PRODUCTS = `https://fakestoreapi.com/products`;

  constructor(
    private http: HttpClient,
    public localDataService: LocalDataService)
  { }

  getAllProducts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.FAKE_API_PRODUCTS);
  }


  // add product-discount
  // admin controller
  addProductDiscount(productDiscount): Observable<any> {
    return this.http.post(this.ADMIN + '/addProductDiscount', productDiscount)
  }

  // get product-discount data
  // admin controller
  getProductDiscountData(productId): Observable<any> {
    return this.http.get(this.ADMIN + '/getProductDiscountData?productId='+productId)
  }

  // get product-sales for discount-zones
  getDiscountZoneProductSales(data): Observable<any> {
    return this.http.post(this.ADMIN + '/getDiscountZoneProductSales', data)
  }
}
