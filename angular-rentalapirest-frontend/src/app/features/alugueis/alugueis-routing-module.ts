import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlugueisCheckout } from './alugueis-checkout/alugueis-checkout';
import { AlugueisNovo } from './alugueis-novo/alugueis-novo';
import { AlugueisLista } from './alugueis-lista/alugueis-lista';
import { Alugueis } from '../../shared/layout/alugueis/alugueis';
import { AlugueisBusca } from './alugueis-busca/alugueis-busca';
import { AlugueisListaAdmin } from './alugueis-lista-admin/alugueis-lista-admin';
import { adminGuard } from '../../core/guards/admin.guard';
import { authGuard } from '../../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: Alugueis,
    children: [
      { path: 'listar', component: AlugueisLista, canActivate: [authGuard] },
      { path: 'checkin', component: AlugueisNovo, canActivate: [adminGuard] },
      { path: 'checkout', component: AlugueisCheckout, canActivate: [adminGuard] },
      { path: 'buscar', component: AlugueisBusca, canActivate: [adminGuard]},
      { path: 'todos', component: AlugueisListaAdmin, canActivate: [adminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
