import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from '../models/Pessoa';
import { ClientesServiceService } from '../services/ClientesService/clientes-service.service';

@Component({
  selector: 'app-modal-pessoa',
  templateUrl: './modal-pessoa.component.html',
  styleUrls: ['./modal-pessoa.component.css']
})
export class ModalPessoaComponent implements OnInit {

  @Input() pessoa: Pessoa;

  constructor(
    private activeModal: NgbActiveModal,
    private clientesService: ClientesServiceService
  ) { }

  ngOnInit() {
  }

  criar(cliente: any) {
    const person = {
      name: cliente.name,
      email: cliente.email,
      password: cliente.password,
      admin: false,
      disabled: false,
      address: cliente.address,
      number: cliente.number,
      city: cliente.city,
      state: cliente.state,
      zipCode: cliente.zipCode,
      neighborhood: cliente.neighborhood
    };

    this.clientesService.setCliente(person)
    .then(() => console.log('Cliente registrado com sucesso'))
    .catch((error) => console.log(error));

    this.activeModal.close('Close click');
  }

  alterar(cliente: any) {
    this.clientesService.updateCliente(cliente)
    .then(() => console.log('Cliente atualizado com sucesso'))
    .catch((error) => console.log(error));

    this.activeModal.close('Close click');
  }

}
