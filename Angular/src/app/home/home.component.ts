import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicosService } from '../servicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrinhoComponent } from '../carrinho/carrinho.component';
import { ModalProdutoComponent } from '../modal-produto/modal-produto.component';
import { LoginService } from '../services/LoginService/login.service';
import { LoggedPerson } from '../models/LoggedPerson';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { Produto } from '../models/Produto';
import { pipe } from 'rxjs';
import { ClientesServiceService } from '../services/ClientesService/clientes-service.service';
import { Pessoa } from '../models/Pessoa';
import { ModalPessoaComponent } from '../modal-pessoa/modal-pessoa.component';
import { ModalExcluirComponent } from '../modal-excluir/modal-excluir.component';
import { Vendas } from '../models/Vendas';
import { VendasServiceService } from '../services/VendasService/vendas-service.service';
//import { login } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() usuario: string;
  login: LoggedPerson = {
    _id: '',
    email: '',
    name: '',
    admin: false
  };

  bdProdutos: Produto[];
  bdClientes: Pessoa[];
  bdVendas: Vendas[];
  vendas: Vendas[];
  produtos: Produto[];
  clientes: Pessoa[];
  busca: string;

  constructor(
    private servicos: ServicosService,
    private produtosService: ProdutosServiceService,
    private clientesService: ClientesServiceService,
    private vendasService: VendasServiceService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private router: Router
    ) {


  }

  ngOnInit() {
    if(!this.loginService.getLoggedPerson())
    {
      console.log('Por favor, efetue login antes!');
      this.router.navigate(['']);
    }
    else
    {
      this.login = this.loginService.getLoggedPerson();
      this.getProdutos(this.login.admin);
      this.getClientes();
      this.getVendas();
    }
  }

  /* getProdutos() {
    this.produtosService.getProdutos()
    .then(prods => {
       this.produtos = prods;
       console.log(this.produtos);
    })
    .catch(error => {
      console.log(error);
    });
  } */

  getProdutos(admin: boolean) {
    this.produtosService.getProdutos(admin)
    .then(prods => {
       this.bdProdutos = prods.map(prod => {
           const _id = prod._id;
           const name = prod.name;
           const imageUrl = prod.imageUrl;
           const description = prod.description;
           const price = prod.price;
           const stock = prod.stock;
           const sales = prod.sales;
           const disabled = prod.disabled;

           return { _id, name, imageUrl, description, price, stock, sales, disabled };
       });

       this.produtos = this.bdProdutos;
       console.log(this.produtos);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getClientes() {
    this.clientesService.getClientes()
    .then(clients => {
      this.bdClientes = clients.map(cli => {
        const _id = cli._id;
        const name = cli.name;
        const email = cli.email;
        const password = cli.password;
        const admin = cli.admin;
        const address = cli.address;
        const number = cli.number;
        const city = cli.city;
        const state = cli.state;
        const zipCode = cli.zipCode;
        const neighborhood = cli.neighborhood;
        const disabled = cli.disabled;

        return { _id, name, email, password, admin, address, number, city, state, zipCode, neighborhood, disabled };
      });

      this.clientes = this.bdClientes;
    })
    .catch(error => {
      console.log(error);
    });
  }

  getVendas() {
    this.vendasService.getSales()
    .then(sales => {
      this.bdVendas = sales.map(sls => {
        const customer = sls.customer;
        const products = sls.products;
        return { customer, products };
      });

      this.vendas = this.bdVendas;
    })
    .catch(error => {
      console.log(error);
    });
  }

  search(dept: string, search: string) {
    switch(dept) {
      case 'p':
        this.produtos = this.bdProdutos.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        break;
      case 'c':
        this.clientes = this.bdClientes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        break;
      case 'v':
        break;
      default:
        console.log('Entre com uma opção válida!\nP para Produtos - C para Clientes - V para Vendas');
    }

  }


  async recarregar() {
    await this.getProdutos(this.login.admin);
    await this.getClientes();
    await this.getVendas();
    this.produtos = this.bdProdutos;
    this.clientes = this.bdClientes;
    this.vendas = this.bdVendas;
  }

  modalCarrinho() {
    const modal = this.modalService.open(CarrinhoComponent);
    modal.componentInstance.name = "Carrinho";
  }

  modalProduto(produto: Produto = new Produto()) {
    const modal = this.modalService.open(ModalProdutoComponent);
    modal.componentInstance.name = "Produto";
    modal.componentInstance.produto = produto;
  }

  modalPessoa(pessoa: Pessoa = new Pessoa()) {
    const modal = this.modalService.open(ModalPessoaComponent);
    modal.componentInstance.name = "Cliente";
    modal.componentInstance.pessoa = pessoa;
  }

  modalExcluir(dep: string, _id: string) {
    const modal = this.modalService.open(ModalExcluirComponent);
    modal.componentInstance.departamento = dep;
    modal.componentInstance._id = _id;
  }

  modalMinhaConta(id: string) {
    let pessoa: Pessoa;
    this.clientesService.getCliente(id)
    .then(p => {
      pessoa = p.person;
      const modal = this.modalService.open(ModalPessoaComponent);
      modal.componentInstance.pessoa = pessoa;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  logout() {
    this.router.navigate(['']);
  }
}
