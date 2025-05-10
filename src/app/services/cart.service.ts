import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  private items: CartItem[] = [];

  addToCart(product: Product) {
    const index = this.items.findIndex(
      (item) => item.product.id === product.id
    );
    if (index > -1) {
      this.items[index].quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.itemsSubject.next(this.items);
  }

  getItems(): CartItem[] {
    return this.items;
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.itemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }
}
