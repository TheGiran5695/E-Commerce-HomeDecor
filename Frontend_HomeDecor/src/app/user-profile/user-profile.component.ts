import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy{
  
  accounts:string = "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-essentials-interface-pack-icons-10067026.png?f=webp"
  nouserdetailsimg:string = "https://cdn-icons-gif.flaticon.com/8717/8717908.gif"
  userDetails: any = null; // Holds user details

  isEditing = false; // Controls the visibility of the edit form
  editForm = {
    email: '',
    phoneNumber: '',
    password: '',
  };

  private userDetailSubscription!: Subscription; // Tracks subscription

  constructor(private authService:AuthService, private router: Router){}
  ngOnInit(): void {
    // Subscribe to user details updates
    this.userDetailSubscription = this.authService.getUserDetails().subscribe((user) => {
      this.userDetails = user;
      // user.phoneNumber = this.maskPhoneNumber(user.phoneNumber);
    console.log('User Details:', this.userDetails);
    // // Redirect to login if no user is found
    // if (!this.userDetails || Object.keys(this.userDetails).length === 0) {
    //   this.router.navigate(['/Signin']); // Adjust route as needed
    // }
  })
}

toggleEdit(): void {
  this.isEditing = !this.isEditing;
}

updateUserDetails(): void {
  const updatedDetails = {
    email: this.editForm.email,
    phoneNumber: this.editForm.phoneNumber,
    password: this.editForm.password,
  };

  // Call update method in AuthService
  this.authService.updateUser(updatedDetails).subscribe({
    next: (response) => {
      console.log('User details updated successfully:', response);
      this.userDetails = { ...this.userDetails, ...updatedDetails };
      this.isEditing = false;
    },
    error: (error) => {
      console.error('Error updating user details:', error);
    },
    complete: () => {
      console.log('Update operation completed.');
    },
  });
}


logout(): void {
  this.authService.logout();
  this.userDetails = null; // Clear local userDetails
  // this.router.navigate(['/Signin']);
}

// maskPhoneNumber(phoneNumber: string): string {
//   return phoneNumber.replace(/.(?=.{4})/g, 'X');
// }

ngOnDestroy(): void {
  // Unsubscribe from the BehaviorSubject to prevent memory leaks
  if (this.userDetailSubscription) {
    this.userDetailSubscription.unsubscribe();
  }
}




}


