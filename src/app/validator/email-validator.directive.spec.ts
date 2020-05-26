import { EmailValidatorDirective } from './email-validator.directive';
import { FormControl, NgModel, FormsModule, NgForm } from '@angular/forms';
import { Component, ViewChild, Input, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import Spy = jasmine.Spy;
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  template:`<input type="email"  name="email" appEmailValidator [(ngModel)]="inputValue"  #myEmail="ngModel">`
})

export class TestComponent {
  @ViewChild('myEmail') 
  public myEmail:NgModel;

  public inputValue: string = '';
}
// Directives must be tested in real usage
// Reference: https://angular.io/guide/testing#attribute-directive-testing
// https://angular.io/guide/testing#component-inside-a-test-host
describe('EmailValidatorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
 // let de: DebugElement;
 // let des:DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EmailValidatorDirective],
      imports: [
        FormsModule
      ],
     
    });
  });
  

  beforeEach(async() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

   //  de = fixture.debugElement;
   // des = fixture.debugElement.query(By.directive(EmailValidatorDirective));

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('it should return null when the value is blank', async() => {
  
    const inputEl = fixture.debugElement.query(By.directive(EmailValidatorDirective)).nativeElement;
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));    
    await fixture.whenStable();   

    expect(component.myEmail.errors)
    .toBeNull();
});
  

  it('should return an error for value something@something', async() => {
  
    const inputEl = fixture.debugElement.query(By.directive(EmailValidatorDirective)).nativeElement;
    inputEl.value = 'something@something';
    inputEl.dispatchEvent(new Event('input'));
    await fixture.whenStable();  

    expect(component.myEmail.errors.invalidEmail)
    .toBeDefined();
});
  

it('should return null for value something@.something.com', async() => {
  
  const inputEl = fixture.debugElement.query(By.directive(EmailValidatorDirective)).nativeElement;
  inputEl.value = 'something@.something.com';
  inputEl.dispatchEvent(new Event('input'));
  await fixture.whenStable();  

  expect(component.myEmail.errors)
  .toBeNull()
});

});
