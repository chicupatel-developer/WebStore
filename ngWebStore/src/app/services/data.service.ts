import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataService } from '../services/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public API = 'https://localhost:44309';
  public FAKE_API_PRODUCTS = `https://fakestoreapi.com/products`;

  constructor(
    private http: HttpClient,
    public localDataService: LocalDataService)
  { }

  getAllProducts(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.FAKE_API_PRODUCTS);
  }
}