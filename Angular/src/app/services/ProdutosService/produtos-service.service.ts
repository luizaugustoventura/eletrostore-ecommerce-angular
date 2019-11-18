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

  getProdutos(admin: boolean): Promise<any> {
    if(admin) {
      return this.httpClient.get(this.apiUrl + '/?admin=1').toPromise();
    }
    else {
      return this.httpClient.get(this.apiUrl).toPromise();
    }
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

  deleteProduto(_id: string): Promise<any> {
    return this.httpClient.delete(this.apiUrl + '/?_id=' + _id).toPromise();
  }
}
