import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }
}
