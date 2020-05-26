import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

export const PHONE_REGEX = new RegExp('^[0-9\\s\+\\-().]*$');

@Directive({
  selector: '[appPhoneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true}]
})
export class PhoneValidatorDirective {

  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.isNullOrUndefinedOrBlank(control.value)) {
      return null;
    }

    if (!PHONE_REGEX.test(control.value)) {
      return {invalidPhoneNumber: 'Not a valid phone number'};
    }
    return null;
  }

  private isNullOrUndefinedOrBlank(value: any): boolean {
    if (value === '') {
      return true;
    }
  
    if (value === null) {
      return true;
    }
  
    if (value === undefined) {
      return true;
    }
  
    return false;
  }
  
}
