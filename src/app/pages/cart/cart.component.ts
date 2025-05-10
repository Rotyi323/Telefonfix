import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PriceSpacePipe } from '../../pipes/price-space.pipe';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CartItem } from '../../models/cart-item.model';

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
export class CartComponent implements OnInit, OnDestroy {
  @Output() cartCleared = new EventEmitter<void>();
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    console.log('[CartComponent] Betöltve!');
    this.cartItems = this.cartService.getItems();
  }

  ngOnDestroy() {
    console.log('[CartComponent] Törölve!');
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.cartCleared.emit();
  }
}
