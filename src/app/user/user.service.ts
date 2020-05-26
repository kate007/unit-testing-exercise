import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Data[] = [
   /*  {
      firstName: 'John',
      lastName: 'Wick',
      phone: '02 555 555',
      email: 'johnwick@services.com'
    },  
    {
      firstName: 'Jason',
      lastName: 'Bourne',
      phone: '02 121 555',
      email: 'jasonbourne@services.com'
    } */
  ]

  constructor() { }

  getAll(): Data[] {
    return this.users;
  }

  save(data:Data)
  {
    this.users.push(data);
  }
}
