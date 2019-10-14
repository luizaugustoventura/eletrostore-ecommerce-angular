import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../servicos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VendasServiceService } from '../services/VendasService/vendas-service.service';
import { ProdutoCarrinho } from '../models/ProdutoCarrinho';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  meuCarrinho: ProdutoCarrinho[] = [];

  constructor(
    private vendasService: VendasServiceService,
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
}
