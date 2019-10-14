import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosServiceService } from '../services/ProdutosService/produtos-service.service';
import { ClientesServiceService } from '../services/ClientesService/clientes-service.service';

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
    private clientesService: ClientesServiceService
  ) { }

  ngOnInit() {
  }

  excluir(dept: string, elemento: any) {
    switch(dept) {
      case 'p':
        this.produtosService.deleteProduto(elemento)
        .then(() => console.log('Produto removido com sucesso'))
        .catch((error) => console.log(error));
        break;
      case 'c':
        this.clientesService.deleteCliente(elemento)
        .then(() => console.log('Cliente removido com sucesso'))
        .catch((error) => console.log(error));
        break;
      default:
        console.log("Insira uma opção válida! 'P' para Produto ou 'C' para Cliente!");
    }
  }

}
