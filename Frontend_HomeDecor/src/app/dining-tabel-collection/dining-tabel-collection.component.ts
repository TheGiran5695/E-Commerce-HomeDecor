import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dining-tabel-collection',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dining-tabel-collection.component.html',
  styleUrl: './dining-tabel-collection.component.css'
})
export class DiningTabelCollectionComponent implements OnInit{

  products: any[] = [];
  filteredProducts: any[] = [];
  totalProducts: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;

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

  // Call applyFilters to filter products by category 'Beds' immediately after loading the data
  this.applyFilters();
    })
  }

  applyFilters():void {
    // Filter products by category "Beds"
    this.filteredProducts = this.products.filter((product: { category: string }) => {
      return product.category === 'DiningSets'; // Only include products with category "Beds"
    });
  }

  toggleDescription(productId: string): void {
    this.expandedProducts[productId] = !this.expandedProducts[productId];
  }

  getFirstWords(text: string, wordCount: number): string {
    const words = text.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : text;
  }

  noprodFound1: string = "https://beautyproductsbd.com/frontend/assets/imgs/product/no-products.jpg"
}
