import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/LoginService/login.service';
import { LoggedPerson } from '../models/LoggedPerson';
import { Router } from '@angular/router';
import { ToastService } from '../services/ToastController/toast.service';
import { VirtualTimeScheduler } from 'rxjs';

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
      private toastService: ToastService,
      private formBuilder: FormBuilder,
      private httpClient: HttpClient,
      private router: Router
  ) { }

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
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
      number: formValues.number,
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
            this.toastService.show('Usuário registrado com sucesso', true);
            this.loggedPerson = loginInfo.person;
            this.loginService.setLoggedPerson(this.loggedPerson);
            this.router.navigate(['/home']);
        })
        .catch(error => {
          this.toastService.show('Erro ao registrar usuário', false);
          console.log(error.message);
        });
    })
    .catch(error => {
      this.toastService.show('Erro ao registrar usuário', false);
      console.log(error.message);
    });
  }

}
