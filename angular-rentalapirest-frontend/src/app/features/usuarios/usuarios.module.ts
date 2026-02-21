import { NgModule } from '@angular/core';
import { UsuariosLista } from './usuarios-lista/usuarios-lista';
import { UsuariosRoutingModule } from './usuarios-routing-module';
import { UsuariosBusca } from './usuarios-busca/usuarios-busca';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [UsuariosRoutingModule, ReactiveFormsModule, FormsModule, CommonModule],
  exports: [],
  declarations: [
    UsuariosLista,
    UsuariosBusca,
  ],
  providers: [],
})
export class UsuariosModule { }
