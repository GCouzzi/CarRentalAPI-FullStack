import { NgModule } from '@angular/core';
import { RouteNotFound } from './route-not-found/route-not-found';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  exports: [RouteNotFound],
  declarations: [RouteNotFound],
  providers: [],
})
export class ComponentsModule { }
