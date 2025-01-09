import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import * as bootstrap from 'bootstrap'; // Import Bootstrap for modal functionality

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{

  email: any = '';
  phoneNumber: any = '';

  isSubmitting: boolean = false;

  placeord:string = "https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-order-now-text-for-promotion-png-image_252595.png"

  emptycart:string = "https://bakestudio.in/assets/images/cart/empty-cart.gif"
  userDetails: any = null; // Holds user details
  private userDetailSubscription!: Subscription; // Tracks subscription

  cartItems: any[] = [];
  cartCount: number = 0;
  subTotal: number = 0;
  estTotal: number = 0;

  loggedIn: boolean = false;
  userCredentials = { email: '', password: '' }; // Bind to the login form

  constructor(
    private cartService: CartService, 
    private apiService: ApiService, 
    private router: Router, 
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.userDetailSubscription = this.authService.getUserDetails().subscribe((user) => {
      this.userDetails = user;
      console.log('User Details:', this.userDetails);
    })
    this.cartService.currentItems.subscribe((data: any) => {
      this.cartItems = data;
      this.calculateCartItems();
    });
  }

  // Delete an item from the cart
  deleteItem(product_id: string): void {
    const updatedItems = this.cartItems.filter((item: any) => item.product._id !== product_id);
    this.cartService.updateItems(updatedItems);
    this.calculateCartItems();
  }

  // Calculate cart totals (count, subtotal, and estimated total)
  calculateCartItems(): void {
    this.cartCount = this.cartItems.length;

    this.subTotal = this.cartItems.reduce((acc: any, current: any) => acc + current.qty, 0);
    this.estTotal = this.cartItems.reduce((acc: any, current: any) => acc + current.product.price * current.qty, 0);
  }

  // Decrease item quantity
  decreaseQty(product_id: string): void {
    const item = this.cartItems.find((item: any) => item.product._id === product_id);
    if (item && item.qty > 1) {
      item.qty--;
      this.cartService.updateItems(this.cartItems);
      this.calculateCartItems();
    }
  }

  // Increase item quantity
  increaseQty(product_id: string): void {
    const item = this.cartItems.find((item: any) => item.product._id === product_id);
    if (item && item.qty < item.product.stock) {
      item.qty++;
      this.cartService.updateItems(this.cartItems);
      this.calculateCartItems();
    } else {
      this.toastr.warning('Your Order Limit exceeds available stock!', 'Warning');
    }
  }

  ModelTrigger(modalContent: any): void {
    if (!this.userDetails) {
      this.toastr.error('Please sign in to proceed.', 'Error');
      return;
    }
  
    // Show the modal
    const modalElement = new bootstrap.Modal(modalContent);
    modalElement.show();
  }

  
  orderComplete(modalContent: any): void {


    console.log('Email:', this.email);
  console.log('Phone Number:', this.phoneNumber);


    if (!this.email || !this.phoneNumber) {
      this.toastr.error('Please fill in all fields.', 'Error');
      return;
    }
  
   // Unmask both the user-provided phone number and the stored phone number
  const unmaskedInputPhoneNumber = this.unmaskPhoneNumber(this.phoneNumber);
  const unmaskedStoredPhoneNumber = this.unmaskPhoneNumber(this.userDetails.phoneNumber);

  console.log('Unmasked Input Phone Number:', unmaskedInputPhoneNumber); // Debugging line to see the unmasked input phone number
  console.log('Unmasked Stored Phone Number:', unmaskedStoredPhoneNumber); // Debugging line to see the unmasked stored phone number

  // Validate email and phone number against user details
  if (this.email !== this.userDetails.email || unmaskedInputPhoneNumber !== unmaskedStoredPhoneNumber) {
    this.toastr.error('Email or phone number does not match your account.', 'Error');
    return;
  }
  
    // Proceed with the order
    const order = { cartItems: this.cartItems };
    this.apiService.orderCreate(order).subscribe((data: any) => {
      if (data.success) {
        const orderId = data.order._id;
        this.router.navigate(['order', 'success', orderId]);
        this.cartService.updateItems([]);
        this.toastr.success('Order placed successfully!', 'Success');
  
        // Hide the modal
        const modalElement = bootstrap.Modal.getInstance(modalContent);
        if (modalElement) modalElement.hide();
      } else {
        this.toastr.error('Failed to place order. Please try again.', 'Error');
      }
    });
  }

  unmaskPhoneNumber(phoneNumber: string): string {
    const unmasked = phoneNumber.replace(/\D/g, ''); // Remove all non-digit characters
  console.log('Phone Number After Unmasking:', unmasked); // Debugging line to verify unmasked phone number
  return unmasked;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the BehaviorSubject to prevent memory leaks
    if (this.userDetailSubscription) {
      this.userDetailSubscription.unsubscribe();
    }
  }
}

