import { Automoveis } from '../../shared/layout/automoveis/automoveis';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomoveisLista } from './automoveis-lista/automoveis-lista';
import { AutomoveisNovo } from './automoveis-novo/automoveis-novo';
import { AutomoveisBusca } from './automoveis-busca/automoveis-busca';
import { adminGuard } from '../../core/guards/admin.guard';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: Automoveis,
    children: [
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: 'lista', component: AutomoveisLista, canActivate: [authGuard] },
      { path: 'novo', component: AutomoveisNovo, canActivate: [adminGuard] },
      { path: 'busca', component: AutomoveisBusca, canActivate: [authGuard] },
      { path: 'busca/:placa', component: AutomoveisBusca, canActivate: [authGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomoveisRoutingModule { }
