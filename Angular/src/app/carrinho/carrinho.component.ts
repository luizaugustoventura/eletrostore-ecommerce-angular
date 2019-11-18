import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../servicos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VendasServiceService } from '../services/VendasService/vendas-service.service';
import { ProdutoCarrinho } from '../models/ProdutoCarrinho';
import { LoginService } from '../services/LoginService/login.service';
import { Venda } from '../models/Venda';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { ToastService } from '../services/ToastController/toast.service';

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
    private produtosService: ProdutosServiceService,
    private toastService: ToastService,
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
      products: products,
      totalPrice: this.meuCarrinho.reduce((a,b) => {
        return a + (b.product.price * b.quantity)
      }, 0)
    };

    console.log(cart);
    this.vendasService.setSale(cart)
    .then(async sale => {
      console.log('Venda realizada');
      console.log(sale);

      await cart.products.forEach(async p => {
        let prod = await this.produtosService.getProduto(p.productId).then(produtct => { return produtct.product });
        prod.sales += p.quantity;
        prod.stock -= p.quantity;
        this.produtosService.updateProduto(prod);
      });

      this.toastService.show('Pedido finalizado com sucesso', true);
      this.activeModal.close('Close click');
    })
    .catch((error) => {
      console.log('Erro ao finalizar venda');
      console.log(error);
    });
  }
}
