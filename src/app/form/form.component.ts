import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '../user/data';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

   @ViewChild('form') form:NgForm;
  submitted = false;

  users: Data[] = [ ];

  user:Data =  {
    firstName: '',
    lastName: '',
    phone: '',
    email: '', 
  }
  constructor(private userService:UserService)
  {

  }

  ngOnInit() {
    this.getAllUsers();
  }

  onSubmit(form:NgForm) {
    this.submitted = true;
    if( form.valid &&  this.user.firstName && this.user.phone && this.user.email )
    {
        this.submitted = true;
        this.userService.save( {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phone: this.user.phone,
          email: this.user.email
        });
        this.getAllUsers();
        this.resetForm();
    }
  }

  getAllUsers(){
    this.users = this.userService.getAll();
  }
  cancel(form:NgForm){
   this.resetForm();
  }

  resetForm()
  {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.phone = '';
    this.user.email = '';
    this.submitted = false;
    this.form.reset();
  }
}
