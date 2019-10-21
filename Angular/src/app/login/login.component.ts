import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ServicosService } from '../servicos.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/LoginService/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoggedPerson } from '../models/LoggedPerson';
import { ToastService } from '../services/ToastController/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  usuario: string;
  senha: string;
  listaProdutos: Produto[] = [];
  nomeUsuario: string;

  constructor(private httpClient: HttpClient,
              public router: Router,
              private formBuilder: FormBuilder,
              private servicos: ServicosService,
              private toastService: ToastService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  identificaUsuario() {
    //this.servicos.setLoginUsuario(this.usuario);
    //this.servicos.setLoginSenha(this.senha);
    //this.router.navigate(['home']);

    const user = {
      "email": this.usuario,
      "password": this.senha
    }

    console.log('Fazendo loggin');

    this.httpClient.post('http://localhost:3333/login/login', user).subscribe(
      data => {
        console.log(data);
        if(data['success']) {
          this.servicos.setLoginUsuario(data['user'].name);
          this.router.navigate(['/home']);
        }
    });
  }

  login(person: any) {

    console.log(person);

    let loggedPerson: LoggedPerson;

    this.loginService.logIn(person)
    .then(loginInfo => {
      console.log(loginInfo);
      loggedPerson = loginInfo.person;
      this.loginService.setLoggedPerson(loggedPerson);
      this.router.navigate(['/home']);
    })
    .catch(error => {
      this.toastService.show('Não foi possível efetuar login', false);
      console.log(error.message);
    });

    /*if(loggedPerson) {
      this.loginService.setLoggedPerson(loggedPerson);
      this.router.navigate(['/home']);
    }*/


  }
}
