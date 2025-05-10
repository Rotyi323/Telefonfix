import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  brands: string[] = [];

  priceFilter: 'all' | 'expensive' | 'cheap' = 'all';
  selectedBrands: string[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      this.filteredProducts = data;
      this.brands = [...new Set(data.map((p) => p.brand))];
    });
  }

  ngAfterViewInit(): void {
    console.log(
      '[ProductsComponent] Minden termékkártya betöltődött a DOM-ba!'
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  navigateTo(id: string | undefined) {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter((product) => {
      const matchPrice =
        this.priceFilter === 'all' ||
        (this.priceFilter === 'expensive' && product.price > 400000) ||
        (this.priceFilter === 'cheap' && product.price < 50000);

      const matchBrand =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(product.brand);

      return matchPrice && matchBrand;
    });
  }

  toggleBrandSelection(brand: string) {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    } else {
      this.selectedBrands.push(brand);
    }
    this.applyFilters();
  }

  onPriceChange(filter: 'all' | 'expensive' | 'cheap') {
    this.priceFilter = filter;
    this.applyFilters();
  }
}
