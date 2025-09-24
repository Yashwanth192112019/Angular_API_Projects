// src/app/components/Auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../Models/Streaming.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials: Login = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: success => {
        if (success) {
          console.log('Login success ✅');
          const role = this.authService.getUserRole();
          console.log('User role from token:', role);

          if (role === 'Subscriber') {
            console.log('Navigating to /user/dashboard');
            this.router.navigate(['/user/dashboard'])
              .then(ok => console.log('Router nav result:', ok));
          }
          else if (role === 'Creator') {
            console.log('Navigating to /creator/upload');
            this.router.navigate(['/creator/upload']);
          }
          else if (role === 'Admin') {
            console.log('Navigating to /admin');
            this.router.navigate(['/admin']);
          }
          else {
            console.warn('Unknown role, redirecting to login');
            this.router.navigate(['/auth/login']);
          }
        } else {
          this.errorMessage = 'Invalid login attempt.';
        }
      },
      error: () => this.errorMessage = 'Login failed. Please try again.'
    });
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
