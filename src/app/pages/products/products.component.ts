import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(private cartService: CartService) {}

  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15',
      price: 489999,
      description: 'Apple A16 Bionic, 128GB, 6.1", OLED, 5G',
      image: '/images/iphone15.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 429999,
      description: 'Snapdragon 8 Gen 3, 256GB, AMOLED, 5G',
      image: '/images/s24.jpg',
    },
    {
      id: 3,
      name: 'Xiaomi 13T Pro',
      price: 299999,
      description: 'Dimensity 9200+, 512GB, 144Hz AMOLED',
      image: '/images/xiaomi13t.jpg',
    },
  ];

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
