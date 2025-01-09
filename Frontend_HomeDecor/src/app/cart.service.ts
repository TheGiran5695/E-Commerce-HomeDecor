import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartItemsFromStorage());
  currentItems = this.cartItemsSubject.asObservable();
  cartItems: any[] = this.getCartItemsFromStorage(); // Initialize with persisted data

  constructor() {}

  // Add an item to the cart
  addItem(newCartItem: any): void {
    const prevCartItem = this.cartItems.find((el: any) => el.product._id === newCartItem.product._id);
    if (prevCartItem) {
      this.cartItems = this.cartItems.map((item: any) => {
        if (item.product._id === prevCartItem.product._id) {
          item.qty = item.qty + 1;
        }
        return item;
      });
    } else {
      this.cartItems.push(newCartItem);
    }
    this.updateCart();
  }

  // Update all items in the cart
  updateItems(items: any[]): void {
    this.cartItems = items;
    this.updateCart();
  }

  private updateCart(): void {
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartItemsToStorage(this.cartItems);
  }

  private getCartItemsFromStorage(): any[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  private saveCartItemsToStorage(cartItems: any[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}
