import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-alugueis-side-bar',
  standalone: false,
  templateUrl: './alugueis-side-bar.html',
  styleUrl: './alugueis-side-bar.scss',
})
export class AlugueisSideBar implements OnInit{
  isAdmin: boolean = false;
  constructor(private readonly _authService: AuthService){}

  ngOnInit(){
    this.isAdmin = this._authService.isAdmin();
  }
}
