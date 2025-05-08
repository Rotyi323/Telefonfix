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
import { CartComponent } from '../cart/cart.component';
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

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  submitOrder() {
    if (this.orderForm.valid) {
      const orderData: Order = {
        name: this.orderForm.value.name,
        email: this.orderForm.value.email,
        items: [], // Kosártartalom később
        message: this.orderForm.value.message,
      };
      console.log('Rendelés leadva:', orderData);
    }
  }

  onCartCleared() {
    alert('A kosár kiürült!');
  }
}
