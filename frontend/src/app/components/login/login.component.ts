import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container" role="main">
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <h1>Login</h1>
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            formControlName="username" 
            required
            aria-label="Username"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            formControlName="password" 
            required
            aria-label="Password"
          >
        </div>
        <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" [disabled]="!loginForm.valid">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f6fa;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    h1 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:disabled {
      background-color: #bdc3c7;
      cursor: not-allowed;
    }
    button:hover:not(:disabled) {
      background-color: #2980b9;
    }
    .error-message {
      color: #e74c3c;
      margin-bottom: 1rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.http.post<any>('http://localhost:3000/api/login', { username, password })
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token || 'dummy-token');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMessage = 'Invalid username or password';
          }
        });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
} 