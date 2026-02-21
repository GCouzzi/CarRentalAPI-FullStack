import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-route-not-found',
  standalone: false,
  templateUrl: './route-not-found.html',
  styleUrl: './route-not-found.scss',
})
export class RouteNotFound implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  constructor(private readonly _authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this._authService.isAdmin();
    this.isAuthenticated = this._authService.isAuthenticated();
  }
}
