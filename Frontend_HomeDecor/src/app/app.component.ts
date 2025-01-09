import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, UserProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Frontend_HomeDecor';
  cartCount = 0;
  searchText: any = '';
  productsTemp:any = []

 demodecor:string = "https://i.pinimg.com/originals/96/21/95/962195497555a7631ecbddc55224884e.gif"

  constructor(private apiService: ApiService, private cartService: CartService, private authService: AuthService){}

  ngOnInit(): void {
      this.cartService.currentItems.subscribe((data) => {
        this.cartCount = data.length;
      })
  }

  search(){
    this.apiService.searchProducts(this.searchText);
    // console.log(this.searchText, 'SEARCH')
  }

  clearSearch(){
    this.apiService.clearSearch(this.searchText)
  }

  searchByEnterKey(){
    this.search()
  }

  Logo:string = "https://interiorhomesdecor.com/assets/images/logo.png"
}
