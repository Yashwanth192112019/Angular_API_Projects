// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Login } from '../Models/Streaming.models';
import { User } from '../Models/Streaming.models'; // DTO for registration

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7192/api'; // your API base URL
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Login using LoginDTO
  login(credentials: Login): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, credentials)
      .pipe(
        map(response => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            console.log('Token stored:', response.token); // debug
            return true;
          }
          return false;
        })
      );
  }

  // Register using UserRegisterDTO
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/Auth/register`, user);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('getToken():', token); // debug
    return token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/auth/login']);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);

      // Try multiple keys for compatibility
      return (
        payload['role'] ||
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'] ||
        null
      );
    } catch (e) {
      console.error('Error decoding token payload:', e);
      return null;
    }
  }
}
