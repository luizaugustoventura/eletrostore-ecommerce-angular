import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { ClientesServiceService } from '../services/ClientesService/clientes-service.service';
import { ToastService } from '../services/ToastController/toast.service';

@Component({
  selector: 'app-modal-excluir',
  templateUrl: './modal-excluir.component.html',
  styleUrls: ['./modal-excluir.component.css']
})
export class ModalExcluirComponent implements OnInit {

  @Input() departamento: string;
  @Input() _id: string;

  constructor(
    private activeModal: NgbActiveModal,
    private produtosService: ProdutosServiceService,
    private clientesService: ClientesServiceService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  excluir(dept: string) {
    console.log(this._id);
    switch(dept) {
      case 'p':
        this.produtosService.deleteProduto(this._id)
        .then(() => this.toastService.show('Produto removido com sucesso', true))
        .catch((error) => {
          this.toastService.show('Erro ao remover produto', false);
          console.log(error);
        });
        break;
      case 'c':
        this.clientesService.deleteCliente(this._id)
        .then(() => this.toastService.show('Cliente removido com sucesso', true))
        .catch((error) => {
          this.toastService.show('Erro ao remover cliente', false);
          console.log(error);
        });
        break;
      default:
        console.log("Insira uma opção válida! 'P' para Produto ou 'C' para Cliente!");
    }
    this.activeModal.dismiss('Cross click');
  }

}
