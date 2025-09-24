// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';
import { DashboardComponent } from './components/User/dashboard/dashboard';
import { AuthGuard } from './Guards/auth-guard';
import { RoleGuard } from './Guards/role-guard';
import { UploadMedia } from './components/media/upload-media/upload-media';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { SubscriptionComponent } from './components/User/subscription/subscription';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // 👈 Default route
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },

  // User
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Subscriber'] }
  },
  {
    path: 'user/subscription',
    component: SubscriptionComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Subscriber'] }
  },

  // Creator
  {
    path: 'creator/upload',
    component: UploadMedia,
    canActivate: [RoleGuard],
    data: { roles: ['Creator'] }
  },

  // Admin
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] }
  },

  // Fallback route
  { path: '**', redirectTo: 'auth/login' }
];


// Now everything feels good enough from the subscriber module, Now lets start working on the creator module, logging in as  creator and what are all the things can I do as a creator. 