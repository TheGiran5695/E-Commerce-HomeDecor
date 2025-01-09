import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-products-decor',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './all-products-decor.component.html',
  styleUrl: './all-products-decor.component.css'
})
export class AllProductsDecorComponent implements OnInit{

  products: any = [ ];
  totalProducts: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;

  // Filters
  filteredProducts: any = [];
  categoryFilter: string = '';
  minPrice: number = 5000;
  maxPrice: number = 70000;
  minRating: number = 0;
  searchText: any = '';

  expandedProducts: { [key: string]: boolean } = {}; // Tracks which product descriptions are expanded

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
      this.apiService.getProducts();
      this.apiService.currentProducts.subscribe((data:any) => {
        this.products = data.products;
        this.filteredProducts = [...this.products ]  // Initialize filteredProducts with all products
      this.totalProducts = this.products.length || 0;  // Total products returned by the backend
    this.startIndex = data.startIndex || 1; // Ensure start index starts from 1
    this.endIndex = data.endIndex || this.products.length; // Set the end index 
      })
  }


  applyFilters() {
    this.filteredProducts = this.products.filter((product: { category: string; price: number; ratings: number; }) => {
      return (
        (!this.categoryFilter || product.category === this.categoryFilter) &&
        product.price >= this.minPrice &&
        product.price <= this.maxPrice &&
        product.ratings >= this.minRating
      );
    });
  }

  resetFilters() {
    this.categoryFilter = '';
    this.minPrice = 0;
    this.maxPrice = Infinity;
    this.minRating = 0;
    this.applyFilters(); // Reapply filters to reset filteredProducts
  }

  // applyFilters(): void {
  //   this.filteredProducts = this.products.filter((product: { category: string; price: number; ratings: number; }) => {
  //     return (
  //       (!this.categoryFilter || product.category === this.categoryFilter) &&
  //       product.price >= this.minPrice &&
  //       product.price <= this.maxPrice &&
  //       product.ratings >= this.minRating
  //     );
  //   });
  // }

  // resetFilters(): void {
  //   this.categoryFilter = '';
  //   this.minPrice = 0;
  //   this.maxPrice = Infinity;
  //   this.minRating = 0;
  //   this.filteredProducts = [...this.products];
  // }

  toggleDescription(productId: string): void {
    this.expandedProducts[productId] = !this.expandedProducts[productId];
  }

  getFirstWords(text: string, wordCount: number): string {
    const words = text.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : text;
  }

  noprodFound1: string = "https://beautyproductsbd.com/frontend/assets/imgs/product/no-products.jpg"
}

  

  

