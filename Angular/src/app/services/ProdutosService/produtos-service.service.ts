import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Server } from '../../../config/server';

@Injectable({
  providedIn: 'root'
})
export class ProdutosServiceService {

  //apiUrl = 'http://localhost:3333/products';
  apiUrl = `${Server.server}/products`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getProdutos(): Promise<any> {
    return this.httpClient.get(this.apiUrl).toPromise();
  }

  getProduto(id: string): Promise<any> {
    return this.httpClient.get((this.apiUrl.slice(0, -1)) + '/?id=' + id).toPromise();
  }

  setProduto(produto: any): Promise<any> {
    return this.httpClient.post(this.apiUrl, produto).toPromise();
  }

  updateProduto(produto: any): Promise<any> {
    return this.httpClient.put(this.apiUrl, produto).toPromise();
  }

  deleteProduto(produto: any): Promise<any> {
    return this.httpClient.delete(this.apiUrl, produto).toPromise();
  }
}
