import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CartComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  orderForm: FormGroup;
  cartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });

    this.cartItems = this.cartService.getItems();
  }

  submitOrder() {
    if (this.cartItems.length === 0) {
      alert('A kosár üres. Kérlek, adj hozzá termékeket a rendeléshez!');
      return;
    }

    if (this.orderForm.valid) {
      const orderData: Order = {
        name: this.orderForm.value.name,
        email: this.orderForm.value.email,
        items: this.cartItems,
        message: this.orderForm.value.message,
      };

      this.orderService.submitOrder(orderData).then(() => {
        alert('Rendelés sikeresen elküldve!');
        this.cartService.clearCart();
        this.cartItems = [];
        this.orderForm.reset();
      });
    }
  }

  onCartCleared() {
    this.cartItems = [];
  }
}
