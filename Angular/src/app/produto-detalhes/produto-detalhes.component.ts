import { Component, OnInit, Input } from '@angular/core';
import { Produto } from '../models/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicosService } from '../servicos.service';
import { Location } from '@angular/common';
import { LoginService } from '../services/LoginService/login.service';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { VendasServiceService } from '../services/VendasService/vendas-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProdutoComponent } from '../modal-produto/modal-produto.component';
import { ModalExcluirComponent } from '../modal-excluir/modal-excluir.component';
import { ToastService } from '../services/ToastController/toast.service';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.css']
})
export class ProdutoDetalhesComponent implements OnInit {

  /* produto: Produto = {
    _id: '',
    name: '',
    imageUrl: '',
    description: '',
    price: 0,
    stock: 0,
    sales: 0
  }; */

  admin = false;
  produto: Produto;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loginService: LoginService,
    private servicos: ServicosService,
    private produtosService: ProdutosServiceService,
    private vendasService: VendasServiceService,
    private modalService: NgbModal,
    private toastService: ToastService)
    {
      if(!this.loginService.getLoggedPerson()){
        console.log("Por favor, efetue login antes!");
        this.router.navigate(['']);
      }
      else {
        this.admin = this.loginService.getLoggedPerson().admin;
      }
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.produtosService.getProduto(this.id)
    .then(prod => {
      this.produto = prod.product;
      console.log(prod);
    })
    .catch(error => {
      console.log(error);
    });
  }

  reservar(P: Produto) {
    //this.servicos.reservarProduto(P);
    //console.log("Carrinho: " + this.produto);
  }

  /* comprar(productId: string, quantity: number) {
    this.vendasService.adicionarAoCarrinho(productId, quantity);
  } */

  comprar(product: Produto, quantity: number) {
    if(quantity >= 1 && quantity <= product.stock) {
      this.toastService.show('Produto adicionado ao carrinho', true);
      this.vendasService.adicionarAoCarrinho(product, Math.abs(Math.trunc(quantity)) );
    }
    else {
      this.toastService.show('Quantidade indisponível', false);
    }
  }

  modalProduto(produto: Produto = new Produto()) {
    const modal = this.modalService.open(ModalProdutoComponent);
    modal.componentInstance.produto = produto;
  }

  modalExcluir(dep: string, _id: string) {
    const modal = this.modalService.open(ModalExcluirComponent);
    modal.componentInstance.departamento = dep;
    modal.componentInstance._id = _id;
  }

}
