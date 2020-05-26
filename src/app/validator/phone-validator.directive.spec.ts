import { PhoneValidatorDirective } from './phone-validator.directive';
import { AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;
import { async } from 'rxjs/internal/scheduler/async';
import { FormControl, NgModel, FormsModule, NgForm } from '@angular/forms';
import { Component, ViewChild, Input, DebugElement, ElementRef } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

@Component({
  template:`<input type="text"  name="phone" appPhoneValidator [(ngModel)]="inputValue"  #phone="ngModel">`
})

export class TestComponent {
  @ViewChild('phone') 
  public phone:NgModel;

  public inputValue: string = '';
}
// Directives must be tested in real usage
// Reference: https://angular.io/guide/testing#attribute-directive-testing
// https://angular.io/guide/testing#component-inside-a-test-host
describe('PhoneValidatorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let de: DebugElement;
  let des:DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, PhoneValidatorDirective],
      imports: [
        FormsModule
      ],
     
    });
  });
  

  beforeEach(async() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

  //  de = fixture.debugElement;
  //   des = fixture.debugElement.query(By.directive(PhoneValidatorDirective));

    await fixture.whenStable();
    fixture.detectChanges();
  });




  // Comment: expect(result).toBeNull()

  
  it('it should return null when the value is blank', async() => {  
    const inputEl = fixture.debugElement.query(By.directive(PhoneValidatorDirective)).nativeElement;
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));    
    await fixture.whenStable();   

    expect(component.phone.errors)
    .toBeNull();
});


  // Comment: Aside from checking if not null, we must check that we are returning the correct error code
  // expect(result.invalidPhoneNumber).toBeDefined();
  it('should return an error for value  -something$', async() => {
  
    const inputEl = fixture.debugElement.query(By.directive(PhoneValidatorDirective)).nativeElement;
    inputEl.value = '-something$';
    inputEl.dispatchEvent(new Event('input'));
    await fixture.whenStable();   

    expect(component.phone.errors.invalidPhoneNumber)
    .toBeDefined();
});

// Comment: expect(result).toBeNull()
it('should return null for value +63 12345', async() => {
  
  const inputEl = fixture.debugElement.query(By.directive(PhoneValidatorDirective)).nativeElement;
  inputEl.value = '+63 12345';
  inputEl.dispatchEvent(new Event('input'));
  await fixture.whenStable();   

  console.log(component.phone);
  expect(component.phone.errors)
  .toBeNull()
});




});
