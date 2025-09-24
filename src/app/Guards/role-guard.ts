import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles']; // roles passed in route
    const userRole = this.authService.getUserRole();

    console.log('RoleGuard check:', { expectedRoles, userRole });

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
