import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap'; // Import Bootstrap for modal functionality
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class SigninPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  failed: string = 'https://assets-v2.lottiefiles.com/a/b5641ed8-1152-11ee-ada0-8f4e8e17569e/AVXn9ghicT.gif'; // Replace with your error gif path
  isSubmitting: boolean = false; // To manage the button state during request

  constructor(private router: Router, private authService: AuthService) {}
 

  onSignin(): void {
    if (this.email && this.password) {
      this.isSubmitting = true; // Disable the button during request

      // Call AuthService to make the login request
      this.authService.signin({ email: this.email, password: this.password }).subscribe({
        next: (response) => {
          // this.user = this.authService.getUser(); // Get user details after login
          // Navigate to the "All Products" page on success
          this.router.navigate(['/DIH_Decor/All_Products/DataVisible/Products']);
          this.isSubmitting = false; // Reset the button state after navigation
        },
        error: (err) => {
          console.error('Signin error:', err); // Add this line for debugging
          this.errorMessage = 'please provide a correct field or something went wrong while signup...!';
          this.isSubmitting = false;
        
          const errorModal: any = document.getElementById('errorModal');
          const bootstrapModal = new bootstrap.Modal(errorModal);
          bootstrapModal.show();
        },
      });
    } 
  }
}


