import { NgModule } from '@angular/core';
import { Layout } from './layout/layout';
import { Nav } from './nav/nav';
import { Footer } from './footer/footer';
import { LayoutRoutingModule } from './layout-routing-module';
import { PagesModule } from '../../features/pages.module';
import { CommonModule } from '@angular/common';
import { UsuariosSideBar } from './usuarios-side-bar/usuarios-side-bar';
import { Usuarios } from './usuarios/usuarios';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [LayoutRoutingModule, PagesModule, CommonModule, RouterModule],
  exports: [Layout, Nav, Footer],
  declarations: [Layout, Nav, Footer, UsuariosSideBar, Usuarios],
  providers: [],
})
export class LayoutModule { }
