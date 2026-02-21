import { NgModule } from '@angular/core';

import { Auth } from './auth/auth';
import { Login } from './login/login';
import { Register } from './register/register';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing-module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [ReactiveFormsModule, RouterModule, AuthRoutingModule, CommonModule],
    exports: [Login, Register],
    declarations: [Auth, Login, Register],
    providers: [],
})
export class AuthModule { }
