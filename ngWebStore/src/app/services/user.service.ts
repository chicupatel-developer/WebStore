import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = 'https://localhost:44309/api';
  public AUTHENTICATE_API = `${this.API}/Authentication`;


  constructor(
    private http: HttpClient,
    public router: Router,
  ) {
  }
  
  private _authChangeSub = new Subject<boolean>();
  private _unChangeSub = new Subject<string>();
  public authChanged = this._authChangeSub.asObservable();
  public unChanged = this._unChangeSub.asObservable();
  public sendAuthStateChangeNotification = (isAuthenticated: boolean, userName: string) => {
    this._authChangeSub.next(isAuthenticated);
    this._unChangeSub.next(userName);
  }

  signin(signinModel): Observable<any> {
    return this.http.post(this.AUTHENTICATE_API + '/login', signinModel)
  } 

  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getHeaderBarColor() {
    if (localStorage.getItem('role') == 'Admin')
      return 'lightgreen';
    else if (localStorage.getItem('role') == 'Shopper')
      return 'lightsalmon';
    else
      return 'lightskyblue';
  }

  get isAdmin(): boolean {
    let role = localStorage.getItem('role');
    return (role == 'Admin') ? true : false;
  }

  get isShopper(): boolean {
    let role = localStorage.getItem('role');
    return (role == 'Shopper') ? true : false;
  }

  get isLoggedIn(): boolean {   
    let userName = localStorage.getItem('userName');
    return (userName !== null) ? true : false;
  }

  doLogout() {
    let removeUserName = localStorage.removeItem('userName');
    let removeToken = localStorage.removeItem('token');
    let removeRole = localStorage.removeItem('role');
    let removeIsAuthenticated = localStorage.removeItem('isAuthenticated');

    if (removeUserName == null && removeToken==null && removeRole==null && removeIsAuthenticated==null) {
      this.router.navigate(['/home']);
    }
  }
}