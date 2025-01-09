import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDetailsSubject = new BehaviorSubject<any>(null); // BehaviorSubject to hold user details
  

  constructor(private http: HttpClient) {
    // Initialize BehaviorSubject with localStorage data (if available)
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.userDetailsSubject.next(storedUser);
  }



  // Signup method
  signup(user: { name: string; email: string; phoneNumber: string; password: string }): Observable<any> {
    return this.http.post(environment.apiUrl + '/user_Api/auth/Signup', user, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      catchError((error) => {
        console.error('Error during signup', error);
        return throwError(() => new Error(error));
      })
    );
  }

  // Signin method
  signin(credentials: { email: string; password: string }): Observable<any> {
  
    return this.http.post(environment.apiUrl + '/user_Api/auth/Signin', credentials).pipe(
      tap((response: any) => {
        console.log('Signin Response: ', response)
        if (response.success) {
          this.userDetailsSubject.next(response.user); // Update the BehaviorSubject
          localStorage.setItem('user', JSON.stringify(response.user)); // Store in localStorage
        }
      }),
      catchError((error) => {
        console.error('Error during signin', error);
        return throwError(() => new Error(error));
      })
    );
  }

  updateUser(updatedDetails: { email?: string; phoneNumber?: string; password?: any }): Observable<any> {
    const userId = this.userDetailsSubject.value?.id; // Assume user ID is stored in userDetailsSubject


    if (!userId) {
      console.error('User ID is missing');
      return throwError(() => new Error('User ID is missing'));
    }


    return this.http.put(`${environment.apiUrl}/user_Api/auth/${userId}`, updatedDetails, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      tap((response) => {
        console.log('Update Response:', response);
        this.userDetailsSubject.next(response); // Update BehaviorSubject with new details
        localStorage.setItem('user', JSON.stringify(response)); // Update localStorage
      }),
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError(() => new Error(error));
      })
    );
  }
  

  // Get current user details as an observable
  getUserDetails(): Observable<any> {
    return this.userDetailsSubject.asObservable(); // Expose the BehaviorSubject as an Observable
  }

  // Logout method
  logout(): void {
    this.userDetailsSubject.next(null); // Clear the BehaviorSubject
    localStorage.removeItem('user'); // Clear localStorage
  }
}


