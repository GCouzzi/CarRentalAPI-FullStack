import { NgModule } from '@angular/core';
import { AutomoveisNovo } from './automoveis-novo/automoveis-novo';
import { AutomoveisBusca } from './automoveis-busca/automoveis-busca';
import { AutomoveisLista } from './automoveis-lista/automoveis-lista';
import { AutomoveisRoutingModule } from './automoveis-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AutomoveisRoutingModule, ReactiveFormsModule, FormsModule, CommonModule],
  exports: [],
  declarations: [
    AutomoveisNovo,
    AutomoveisBusca,
    AutomoveisLista
  ],
  providers: [],
})
export class AutomoveisModule { }
