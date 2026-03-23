import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      if (role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (role === 'provider') {
        this.router.navigate(['/provider-dashboard']);
      } else {
        this.router.navigate(['/vehicles']);
      }
    }
  }

  login(): void {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        const role = response.user.role;
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'provider') {
          this.router.navigate(['/provider-dashboard']);
        } else {
          this.router.navigate(['/vehicles']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
