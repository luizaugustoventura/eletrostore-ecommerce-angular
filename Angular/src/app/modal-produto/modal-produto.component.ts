import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from '../models/Produto';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastControllerComponent } from '../toast-controller/toast-controller.component';

@Component({
  selector: 'app-modal-produto',
  templateUrl: './modal-produto.component.html',
  styleUrls: ['./modal-produto.component.css']
})
export class ModalProdutoComponent implements OnInit {

  @Input() produto: Produto;
  formProduto: FormGroup;
  //toastContoller;

  constructor(
    private activeModal: NgbActiveModal,
    private produtosService: ProdutosServiceService,
    private formBuilder: FormBuilder
  ) {
    //this.toastContoller = new ToastControllerComponent();
  }

  ngOnInit() {
  }

  criar(Produto: any) {

    const product = {
      name: Produto.name,
      imageUrl: Produto.imageUrl,
      description: Produto.description,
      price: Produto.price,
      disabled: false,
      stock: Produto.stock,
      sales: 0
    };
    this.produtosService.setProduto(product)
    .then(() => {
      console.log('Produto registrado com sucesso');
      //this.toastContoller.showToast('Produto registrado com sucesso', true);
    })
    .catch((error) => {
      console.log(error);
      //this.toastContoller.showToast('Erro ao registrar Produto', false);
    });

    this.activeModal.close('Close click');
  }

  alterar(produto: any) {
    this.produtosService.updateProduto(produto)
    .then(() => {
      console.log('Produto atualizado com sucesso');
      //this.toastContoller.showToast('Produto atualizado com sucesso', true);
    })
    .catch((error) => {
      console.log(error);
      //this.toastContoller.showToast('Erro ao atualizar produto', false);
    });

    this.activeModal.close('Close click');
  }

}
