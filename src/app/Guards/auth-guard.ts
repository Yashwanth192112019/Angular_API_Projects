// src/app/Guards/auth-guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    console.log('AuthGuard token:', token);

    if (token) {
      console.log('AuthGuard check: true ✅');
      return true;
    }

    console.warn('AuthGuard blocked navigation, redirecting to login ❌');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
