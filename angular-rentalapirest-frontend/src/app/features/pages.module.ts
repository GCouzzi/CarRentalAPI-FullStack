import { NgModule } from '@angular/core';

import { Home } from './home/home/home';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [Home],
  declarations: [Home],
  providers: [],
})
export class PagesModule { }

