import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../../../config/server';

@Injectable({
  providedIn: 'root'
})
export class ClientesServiceService {

  apiUrl = Server.server;
  //apiUrl = 'http://localhost:3333/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getClientes(): Promise<any> {
    return this.httpClient.get(`${this.apiUrl}/people`).toPromise();
  }

  getCliente(id: string): Promise<any> {
    return this.httpClient.get(`${this.apiUrl}/person/?id=${id}`).toPromise();
  }

  setCliente(pessoa: any): Promise<any> {
    return this.httpClient.post(`${this.apiUrl}/person`, pessoa).toPromise();
  }

  updateCliente(pessoa: any): Promise<any> {
    return this.httpClient.put(`${this.apiUrl}/people`, pessoa).toPromise();
  }

  deleteCliente(_id: any): Promise<any> {
    return this.httpClient.delete(`${this.apiUrl}/people/?_id=${_id}`).toPromise();
  }
}
