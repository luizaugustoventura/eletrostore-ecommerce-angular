import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggedPerson } from 'src/app/models/LoggedPerson';
import { Server } from '../../../config/server';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginApi = 'http://localhost:3333/login';
  //loginApi = `${Server.server}/login`;

  user = {
    _id: '',
    name: '',
    email: ''
  };

  loggedPerson: LoggedPerson;

  constructor(private httpClient: HttpClient) { }

  /* logIn(user: any): LoggedPerson {
    this.httpClient.post(this.loginApi + '/login', user)
    .subscribe((data) => {
      if(data['success']) {
        const person: LoggedPerson = {
          _id: data['person']._id,
          name: data['person'].name,
          email: data['person'].email,
          admin: data['person'].admin
        };

        console.log(person);
        return person;
      }
    });
    return;
  } */

  logIn(user: any): Promise<any> {
    return this.httpClient.post(this.loginApi + '/login', user).toPromise();
  }

  signIn(user: any): Promise<any> {
    return this.httpClient.post((this.loginApi + '/signin'), user).toPromise();
  }

  setLoggedPerson(person: LoggedPerson) {
    this.loggedPerson = person;
  }

  getLoggedPerson(): LoggedPerson {
    return this.loggedPerson;
  }

}
