import { Injectable } from '@angular/core';
import { PRODUTOS } from './mock-produtos';
import { Produto } from './produto';


@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  baseProdutos = PRODUTOS;
  reservasProdutos: Array<Produto> = [];
  loginUsuario: string;
  loginSenha: string;

  constructor() { }

  getLoginUsuario() {
    return this.loginUsuario;
  }

  setLoginUsuario(login: string) {
    this.loginUsuario = login;
  }

  getLoginSenha() {
    return this.loginSenha;
  }

  setLoginSenha(senha: string) {
    this.loginSenha = senha;
  }

  getListaProdutos() {
    return this.baseProdutos;
  }

  buscaProdutos(busca: string) {
    /*const lista = this.baseProdutos.filter(
      p => p.nome.match("(.*)" + busca + "(.*)") || p.id.toString().match("(.*)" + busca + "(.*)"));
    return lista;*/

    const lista = this.baseProdutos.filter(
      p => p.nome.toUpperCase().match(
        "(.*)" + busca.toUpperCase() + "(.*)") || p.id.toString().match("(.*)" + busca.toUpperCase() + "(.*)"));
    return lista;
  }

  reservarProduto(p: Produto) {
    this.reservasProdutos.push(p);
  }

  removeReserva(id: number) {
    this.reservasProdutos = this.reservasProdutos.filter(r => r.id != id);
    return this.reservasProdutos;
  }

  getReservasProdutos() {
    return this.reservasProdutos;
  }
}
