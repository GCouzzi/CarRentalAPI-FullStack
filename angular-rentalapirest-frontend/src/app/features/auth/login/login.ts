import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthFormConfig, LOGIN_CONFIG } from '../auth.config';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../core/models/auth.model';
import { AppApiError } from '../../../core/models/app-api-error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  config: AuthFormConfig = LOGIN_CONFIG;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly _authService: AuthService,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _router: Router,
  ) {}

  onSubmit(formValue: any) {
    this.loading = true;
    this.errorMessage = '';
    this._authService.login(formValue).subscribe({
      next: (response: LoginResponse) => {
        this._authService.setToken(response.token);
        this.loading = false;
        this._cdr.markForCheck()
        this._router.navigate(['/home']);
      },
      error: (err: AppApiError) => {
        this.errorMessage = `Error ${err.status} - ${err.message}`;
        this.loading = false;
        this._cdr.markForCheck()
      },
    });
  }
}
