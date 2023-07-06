import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExemploPesquisaComponent } from './exemplo-pesquisa/exemplo-pesquisa.component';
import { ExemploCadastroComponent } from './exemplo-cadastro/exemplo-cadastro.component';



@NgModule({
  declarations: [
    ExemploPesquisaComponent,
    ExemploCadastroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExampleCrudModule { }
