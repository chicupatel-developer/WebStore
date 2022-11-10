import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class DiscountPercentageValidation {
  static match(checkControlName): ValidatorFn {
    return (controls: AbstractControl) => {
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['overhundred']) {
        return null;
      }

      if (checkControl?.value > 100) {
        controls.get(checkControlName)?.setErrors({ overhundred: true });
        return { overhundred: true };
      } else {
        return null;
      }
    };
  }
}