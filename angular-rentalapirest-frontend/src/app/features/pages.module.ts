import { NgModule } from '@angular/core';

import { Home } from './home/home/home';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Me } from './me/me';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [Home],
  declarations: [Home, Me],
  providers: [],
})
export class PagesModule { }

