import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cartService = inject(CartService);
  cartCount = signal(0);

  constructor() {
    this.cartService.items$.subscribe((items: CartItem[]) => {
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartCount.set(total);
    });
  }
}
