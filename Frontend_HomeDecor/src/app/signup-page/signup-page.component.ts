import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';  // Import Bootstrap Modal

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  name: string = '';
  email: string = '';
  phonenumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  modalMessage: string = '';
  signupStatus: string = '';
  // success: string = 'https://media.tenor.com/BSY1qTH8g-oAAAAM/check.gif';
  // failed: string = 'assets/failed.gif';
  errorMessage: string = '';
  isSubmitting: boolean = false;  // Disable button while submitting

  success = 'https://media.tenor.com/BSY1qTH8g-oAAAAM/check.gif';
  failed = 'https://via.placeholder.com/150/FF0000?text=Error';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(){
    if (!this.name || !this.email || !this.phonenumber || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required!';
      this.showModal('errorModal');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      this.showModal('errorModal');
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phonenumber,
      password: this.password,
    };

    this.isSubmitting = true;
    this.authService.signup(user).subscribe({
      next: () => {
        this.modalMessage = 'Signup successful! Redirecting to SignIn page.';
        this.showModal('successModal');
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Signup failed! Please try again.';
        this.showModal('errorModal');
        this.isSubmitting = false;
      },
    });
  }

  showModal(modalId: string): void {
    const modal = new bootstrap.Modal(document.getElementById(modalId)!);
    modal.show();
  }

  navigateToSignIn(): void {
    this.router.navigate(['/Signin']);
    // Close the modal programmatically
    const successModal = new Modal(document.getElementById('successModal')!);
    successModal.hide();
  }

  
}









    

