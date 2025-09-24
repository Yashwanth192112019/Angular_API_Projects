// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service.js';
import { FormsModule } from '@angular/forms';
import { User } from '../../../Models/Streaming.models.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,               
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user: User = { userName: '', email: '', passwordHash: '', role: 'Subscriber'};
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: () => {
        this.message = 'Registration successful. Please login.';
        this.router.navigate(['/auth/login']);
      },
      error: () => this.message = 'Registration failed. Try again.'
    });
  }

  goToLogin(){
    this.router.navigate(['/auth/login']);
  }
}
