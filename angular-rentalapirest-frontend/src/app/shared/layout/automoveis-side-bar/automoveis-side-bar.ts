import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-automoveis-side-bar',
  standalone: false,
  templateUrl: './automoveis-side-bar.html',
  styleUrl: './automoveis-side-bar.scss',
})
export class AutomoveisSideBar {
  isAdmin: boolean = false;
  constructor(private readonly _authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this._authService.isAdmin();
  }
}
