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
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: 'lista', component: AlugueisLista, canActivate: [authGuard], title: 'Meus aluguéis' },
      { path: 'checkin', component: AlugueisNovo, canActivate: [adminGuard], title: 'Check-in' },
      { path: 'checkout', component: AlugueisCheckout, canActivate: [adminGuard], title: 'Check-out' },
      { path: 'busca', component: AlugueisBusca, canActivate: [adminGuard], title: 'Buscar aluguéis' },
      { path: 'busca/:recibo', component: AlugueisBusca, canActivate: [adminGuard], title: 'Buscar aluguel' },
      { path: 'todos', component: AlugueisListaAdmin, canActivate: [adminGuard], title: 'Todos aluguéis' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
