import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor() { }



  // 400
  // error handler
  display400andEx(error, componentName): string[] {
    var errors = [];
    if (error.status === 400) {
      if (error.error.errors != null) {
        for (var key in error.error.errors) {
          errors.push(error.error.errors[key]);
        }
      } else {
        errors.push('[' + componentName + '] Data Not Found ! / Bad Request !');
      }
    }
    else {
      console.log(error);
    }
    return errors;
  }


  // check for 403
  // if any component's init() is requesting api without 
  // (token or valid token),
  // then auth-guard intercepts 403
  // if any component's init() is NOT requesting api,
  // so auth-guard has never get a chance to intercept 403 and 
  // component's html page gets display
  // so even to prevent to display component's html page and 
  // redirects to home page,,, do,,,
  authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Admin(reqPath) {
    if (reqPath == '/admin-reports')
      return false;
    else  if (reqPath == '/admin-products')
      return false;
    else
      return true;
  }
  authGuard403_Intercept_To_PreventDisplayOfHtmlPage_Of_Component_Shopper(reqPath) {
    if (reqPath == '/cart')
      return false;
    else if (reqPath == '/shopping-history')
      return false;
    else if (reqPath == '/shopper-products')
      return false;
    else
      return true;
  }

  getProductTitleForDisplay(title) {
    if (title.length > 20) {
      return title.substring(0, 20) + "...";
    }
    else {
      return title;
    }
  }




  // search-value
  // header change this search-value
  // notify shopper-admin-products component via local-data-service
  private _svChangeSub = new Subject<string>();
  public svChanged = this._svChangeSub.asObservable();
  public sendSearchValueChangeNotification = (searchValue: string) => {    
    this._svChangeSub.next(searchValue);
  }  
  


  // this will store products[]
  // will be used to filter when search-value gets changed
  private Products;
  setProducts(val) {
    this.Products = [...val];
  }
  getProducts() {
    return this.Products;
  }

  // this will store product{} for setting discount on it by admin
  private Product;
  setProduct(val) {
    this.Product = val;
  }
  getProduct() {
    return this.Product;
  }
}
