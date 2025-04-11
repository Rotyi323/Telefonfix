import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId!: number;
  product: any;

  products = [
    {
      id: 1,
      name: 'iPhone 15',
      price: 489999,
      description: 'Apple A16 Bionic, 128GB, 6.1", OLED, 5G',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 429999,
      description: 'Snapdragon 8 Gen 3, 256GB, AMOLED, 5G',
    },
    {
      id: 3,
      name: 'Xiaomi 13T Pro',
      price: 299999,
      description: 'Dimensity 9200+, 512GB, 144Hz AMOLED',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((p) => p.id === this.productId);
  }
}
