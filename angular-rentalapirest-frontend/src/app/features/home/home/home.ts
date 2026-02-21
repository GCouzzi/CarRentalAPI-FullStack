import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  isAdmin: boolean = false;
  constructor(private readonly _authService: AuthService) { }

  ngOnInit() {
    this.isAdmin = this._authService.isAdmin();
  }
}
