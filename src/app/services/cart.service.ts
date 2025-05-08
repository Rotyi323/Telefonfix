import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: Product[] = [];
  private itemsSubject = new BehaviorSubject<Product[]>(this.items);
  items$ = this.itemsSubject.asObservable();

  addToCart(product: Product) {
    this.items.push(product);
    this.itemsSubject.next([...this.items]);
  }

  getItems(): Product[] {
    return [...this.items];
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.itemsSubject.next([...this.items]);
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next([]);
  }
}
