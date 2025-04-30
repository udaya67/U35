import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item">
            Solar Trains
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item" routerLink="/dashboard" routerLinkActive="active">
              Dashboard
            </a>
            <a class="navbar-item" routerLink="/summary" routerLinkActive="active">
              Summary
            </a>
            <a class="navbar-item" routerLink="/reports" routerLinkActive="active">
              Reports
            </a>
            <a class="navbar-item" (click)="logout()">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #2c3e50;
      padding: 1rem;
      color: white;
    }
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: #3498db; /* Blue background */
  padding: 0.5rem 1rem;       /* Add some spacing */
  border-radius: 5px;         /* Optional: rounded corners */
}
    .navbar-menu {
      display: flex;
      gap: 1rem;
    }
    .navbar-item {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .navbar-item:hover {
      background-color:rgb(48, 120, 191);
    }
    .active {
      background-color: #3498db;
    }
  `]
})
export class NavigationComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
} 