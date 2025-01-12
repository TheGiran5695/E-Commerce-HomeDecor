import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule, UserProfileComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  iscontact_Us: boolean = false
  iscontent: boolean = false
  title = 'Frontend_HomeDecor';
  cartCount = 0;
  searchText: any = '';
  productsTemp:any = []

 demodecor:string = "https://i.pinimg.com/originals/96/21/95/962195497555a7631ecbddc55224884e.gif"

  constructor(private apiService: ApiService, private cartService: CartService, private authService: AuthService, private router :Router){}

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


  
  scrollToSection() {
    // Navigate to the home page
    this.router.navigate(['/']).then(() => {
      // Show the section
      this.iscontent = true;

      // Optionally, scroll to the element
      const element = document.getElementById('content_dc');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  scrollTocontact_Us(){
    this.router.navigate(['/']).then(() => {
      this.iscontact_Us = true;

      const element2 = document.getElementById('contact_Us');
      if(element2){
        element2.scrollIntoView({ behavior: 'smooth'})
      }
    })
  }

  onScrollHome(){
    const homeCannel = document.getElementById('homeCannel');
    if(homeCannel){
      homeCannel.scrollIntoView({ behavior: 'smooth' })
    }
  }
  Logo:string = "https://interiorhomesdecor.com/assets/images/logo.png"
}
