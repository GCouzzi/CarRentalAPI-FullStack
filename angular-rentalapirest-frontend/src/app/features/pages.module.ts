import { NgModule } from '@angular/core';

import { Home } from './home/home/home';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Me } from './me/me';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [Home],
  declarations: [Home, Me],
  providers: [],
})
export class PagesModule { }

