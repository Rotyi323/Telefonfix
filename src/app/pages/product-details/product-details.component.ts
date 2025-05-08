import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../models/product.model';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { PriceSpacePipe } from '../../pipes/price-space.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, PriceSpacePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const docRef = doc(this.firestore, `products/${id}`);
      docData(docRef).subscribe({
        next: (data) => {
          this.product = data as Product;
        },
        error: () => {
          this.product = null;
        },
      });
    }
  }
}
