import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/LoginService/login.service';
import { LoggedPerson } from '../models/LoggedPerson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loggedPerson: LoggedPerson;
  formRegister: FormGroup;

  constructor(
      private loginService: LoginService,
      private formBuilder: FormBuilder,
      private httpClient: HttpClient,
      private router: Router
  ) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      neighborhood: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
    });
  }

  registerUser(formValues: any) {
    const user = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      address: formValues.address,
      city: formValues.city,
      neighborhood: formValues.neighborhood,
      state: formValues.state,
      zipCode: formValues.zipCode,
      admin: false,
      disabled: false
    };

    this.loginService.signIn(user)
    .then((usr) => {

        const login = {
          email: usr.person.email,
          password: usr.person.password
        };

        this.loginService.logIn(login)
        .then(loginInfo => {
            this.loggedPerson = loginInfo.person;
            this.loginService.setLoggedPerson(this.loggedPerson);
            this.router.navigate(['/home']);
        })
        .catch(error => {
          console.log(error.message);
        });
    })
    .catch(error => {
      console.log(error.message);
    });
  }

}
