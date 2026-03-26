import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from '../../features/home/home/home';
import { adminGuard } from '../../core/guards/admin.guard';
import { authGuard } from '../../core/guards/auth.guard';
import { Me } from '../../features/me/me';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home, title: 'Página inicial' },
      { path: 'me', component: Me, title: 'Meu perfil' },
      { path: 'usuarios', loadChildren: () => import('../../features/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [adminGuard] },
      { path: 'automoveis', loadChildren: () => import('../../features/automoveis/automoveis.module').then(m => m.AutomoveisModule), canActivate: [authGuard] },
      { path: 'alugueis', loadChildren: () => import('../../features/alugueis/alugueis.module').then(m => m.AlugueisModule), canActivate: [authGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
