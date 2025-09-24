import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';
import { DashboardComponent } from './components/User/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stream');
}
