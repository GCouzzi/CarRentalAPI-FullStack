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
      { path: 'lista', component: AutomoveisLista, canActivate: [authGuard], title: 'Listar automóveis' },
      { path: 'novo', component: AutomoveisNovo, canActivate: [adminGuard], title: 'Registrar automóvel' },
      { path: 'busca', component: AutomoveisBusca, canActivate: [authGuard], title: 'Buscar automóvel' },
      { path: 'busca/:placa', component: AutomoveisBusca, canActivate: [authGuard], title: 'Buscar automóvel' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomoveisRoutingModule { }
