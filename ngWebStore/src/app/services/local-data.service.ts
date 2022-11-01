import { Injectable } from '@angular/core';

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



}
