import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from '../models/Pessoa';
import { ClientesServiceService } from '../services/ClientesService/clientes-service.service';
import { ToastService } from '../services/ToastController/toast.service';

@Component({
  selector: 'app-modal-pessoa',
  templateUrl: './modal-pessoa.component.html',
  styleUrls: ['./modal-pessoa.component.css']
})
export class ModalPessoaComponent implements OnInit {

  @Input() pessoa: Pessoa;

  constructor(
    private activeModal: NgbActiveModal,
    private clientesService: ClientesServiceService,
    private toastService: ToastService
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
    .then(() => {
      console.log('Cliente registrado com sucesso');
      this.toastService.show('Cliente registrado com sucesso', true);
    })
    .catch((error) => {
      console.log(error);
      this.toastService.show('Erro ao registrar cliente', false);
    });

    this.activeModal.close('Close click');
  }

  alterar(cliente: any) {
    this.clientesService.updateCliente(cliente)
    .then(() => {
      console.log('Cliente atualizado com sucesso');
      this.toastService.show('Cliente atualizado com sucesso', true);
    })
    .catch((error) => {
      console.log(error);
      this.toastService.show('Erro ao atualizar cliente', false);
    });

    this.activeModal.close('Close click');
  }

}
