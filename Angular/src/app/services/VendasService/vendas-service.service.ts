import { Injectable } from '@angular/core';
import { Carrinho } from 'src/app/models/Carrinho';
import { Produto } from 'src/app/models/Produto';
import { ProdutosServiceService } from '../ProdutosService/produtos-service.service';
import { ProdutoCarrinho } from 'src/app/models/ProdutoCarrinho';
import { Server } from '../../../config/server';

@Injectable({
  providedIn: 'root'
})
export class VendasServiceService {

  //apiUrl = 'http://localhost:3333/product';
  apiUrl = `${Server.server}/product`;
  //meuCarrinho: Carrinho[] = [];
  /*produtosCarrinho: {
    product: Produto,
    quantity: number
  }[] = [];
  */

  produtosCarrinho: ProdutoCarrinho[] = [];


  constructor(
    private produtosService: ProdutosServiceService
  ) { }

  /* adicionarAoCarrinho(productId: string, quantity: number) {
    const prod = this.meuCarrinho.find(p => {return p.productId == productId});//Objeto tipo Venda
    let Prod: Produto;//Objeto tipo Produto

    if(prod) { //Se o produto já está no carrinho
      //const indexCarrinho = this.meuCarrinho.findIndex(p => p.productId == productId);
      //this.meuCarrinho[indexCarrinho].quantity += quantity;

      //const indexProdutos = this.produtosCarrinho.findIndex(p => p.product._id == productId);
      //this.produtosCarrinho[indexProdutos].quantity += quantity;

      this.meuCarrinho.find(p => p.productId == productId).quantity += quantity;
      this.produtosCarrinho.find(p => p.product._id == productId).quantity += quantity;
    }
    else {
      //Busca o produto vindo do Carrinho usando seu ID
      console.log(productId);
      this.produtosService.getProduto(productId)
      .then(product => {
        const newProduct: Produto =
          {
            _id: product._id,
            name: product.name,
            imageUrl: product.imageUrl,
            description: product.description,
            price: product.price,
            stock: product.stock,
            sales: product.sales
          };

        Prod = newProduct;
        console.log("Produto");
        console.log(Prod);

        this.meuCarrinho.push({ productId: productId, quantity: quantity }); //Adiciona ao objeto tipo Venda
        this.produtosCarrinho.push({ product: Prod, quantity: quantity });//Adiciona ao objeto tipo Produto
        console.log('Carrinho');
        console.log(this.meuCarrinho);
        console.log('Produtos carrinho');
        console.log(this.produtosCarrinho);
      })
      .catch(error => {
        console.log(error);
      });
    }
  } */

  adicionarAoCarrinho(product: Produto, quantity: number) {
    const prod = this.produtosCarrinho.find(p => {return p.product._id == product._id});
    //let Prod: Produto = product;//Objeto tipo Produto

    if(prod) { //Se o produto já está no carrinho
      this.produtosCarrinho.find(p => p.product._id == product._id).quantity += quantity;
    }
    else {
      //Busca o produto vindo do Carrinho usando seu ID
      console.log(product._id);

      this.produtosCarrinho.push({ product: product, quantity: quantity });//Adiciona ao objeto tipo Produto
      console.log('Produtos carrinho');
      console.log(this.produtosCarrinho);
    }
  }

  getItensCarrinho(): ProdutoCarrinho[] {
    return this.produtosCarrinho;
  }

  removerDoCarrinho(id: string): ProdutoCarrinho[] {
    this.produtosCarrinho = this.produtosCarrinho.filter(p => p.product._id != id);
    console.log(this.produtosCarrinho);
    return this.produtosCarrinho;
  }
}
