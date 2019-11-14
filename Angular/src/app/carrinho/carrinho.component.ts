import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../servicos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VendasServiceService } from '../services/VendasService/vendas-service.service';
import { ProdutoCarrinho } from '../models/ProdutoCarrinho';
import { LoginService } from '../services/LoginService/login.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  meuCarrinho: ProdutoCarrinho[] = [];

  constructor(
    private vendasService: VendasServiceService,
    private loginService: LoginService,
    private servicos: ServicosService,
    public activeModal: NgbActiveModal
    ) {
    this.meuCarrinho = vendasService.getItensCarrinho();
  }

  ngOnInit() {
  }

  removerProduto(id: string) {
    this.meuCarrinho = this.vendasService.removerDoCarrinho(id);
  }

  finalizarPedido() {
    //Filtra a lista do carrinho para obter os IDs dos produtos e suas respectivas quantidades
    const products = this.meuCarrinho.map(item => {
      return { productId: item.product._id, quantity: item.quantity };
    });

    //Cria o objeto para finalizar a venda a partir do ID do cliente mais a lista anterior
    const cart = {
      customerId: this.loginService.getLoggedPerson()._id,
      products: products
    };

    console.log(cart);
    this.vendasService.setSale(cart)
    .then(sale => {
      console.log('Venda realizada');
      console.log(sale);
    })
    .catch((error) => {
      console.log('Erro ao finalizar venda');
      console.log(error);
    });
  }
}
