import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProdutoDetalhesComponent } from './produto-detalhes/produto-detalhes.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalProdutoComponent } from './modal-produto/modal-produto.component';
import { ModalPessoaComponent } from './modal-pessoa/modal-pessoa.component';
import { ModalExcluirComponent } from './modal-excluir/modal-excluir.component';
import { ToastControllerComponent } from './toast-controller/toast-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProdutoDetalhesComponent,
    CarrinhoComponent,
    RegisterComponent,
    ModalProdutoComponent,
    ModalPessoaComponent,
    ModalExcluirComponent,
    //ToastControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  providers: [],
  entryComponents: [CarrinhoComponent, ModalProdutoComponent, ModalPessoaComponent, ModalExcluirComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
