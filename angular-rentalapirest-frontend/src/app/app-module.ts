import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ComponentsModule } from './shared/components/components.module';
import { Automoveis } from './shared/layout/automoveis/automoveis';
import { AutomoveisSideBar } from './shared/layout/automoveis-side-bar/automoveis-side-bar';
import { Alugueis } from './shared/layout/alugueis/alugueis';
import { AlugueisSideBar } from './shared/layout/alugueis-side-bar/alugueis-side-bar';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';


@NgModule({
  declarations: [
    App,
    Automoveis,
    AutomoveisSideBar,
    Alugueis,
    AlugueisSideBar,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [App]
})
export class AppModule {

}
