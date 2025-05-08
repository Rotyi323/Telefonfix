import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PriceSpacePipe } from '../../pipes/price-space.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgFor,
    PriceSpacePipe,
    TruncatePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
