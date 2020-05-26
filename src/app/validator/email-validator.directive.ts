import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator{

 

  private static validateEmailPattern(control: FormControl): ValidationErrors | null {
    const emailRegex: RegExp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+[.][a-zA-Z0-9-.]{2,}$');

    const value = control.value;

    if (!emailRegex.test(value) && value) {
      return { invalidEmail: 'Not a valid email address' };
    }
    return null;
  }
  constructor() { }
  //returns null if it succeeds, key if fails
  //FormControl = is child of Abstract Control
  validate(control: FormControl): {[key: string]: ValidationErrors} | null {

  
    return EmailValidatorDirective.validateEmailPattern(control);
  }

}
