import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { EmailValidatorDirective } from './validator/email-validator.directive';
import { PhoneValidatorDirective } from './validator/phone-validator.directive';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EmailValidatorDirective,
    PhoneValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
