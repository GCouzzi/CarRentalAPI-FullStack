import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Usuarios } from '../../shared/layout/usuarios/usuarios';
import { UsuariosLista } from './usuarios-lista/usuarios-lista';
import { UsuariosBusca } from './usuarios-busca/usuarios-busca';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: Usuarios,
    children: [
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: 'lista', component: UsuariosLista, canActivate: [adminGuard] },
      { path: 'busca', component: UsuariosBusca, canActivate: [adminGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
