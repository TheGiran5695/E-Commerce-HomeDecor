import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastrModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  count: number = 34
  product: any = null
  selectedImage: string = ''; // Initialize as an empty string
  qty: number = 1


 constructor(private route:ActivatedRoute, private apiService: ApiService, private cartService: CartService, private toastr: ToastrService){}

 ngOnInit(): void {
  this.route.params.subscribe((data) => {
    const id = data['id'];
    this.apiService.getSingleProduct(id).subscribe((data:any) => {
      this.product = data.product;
      console.log('Product data:', data);
    })
  })
 }

 // Function to handle click on a thumbnail
 onImageClick(imageUrl: string) {
  this.selectedImage = imageUrl;
}

increaseQty(){
  if(this.qty == this.product.stock){
    return;
  }
  this.qty = this.qty + 1
}
decreaseQty() {
  if(this.qty == 1)
    return;
    this.qty = this.qty - 1
}

addToCart(){
  const newCartItem = {
    product: this.product,
    qty: this.qty
  }

  if(this.product.stock == 0){
    this.toastr.warning('Out Of Stock !', 'dih Interior Homes Decor..!');
    return;
  }

  // Add Cart Item
  this.cartService.addItem(newCartItem);
  this.toastr.success('cart Item Added !', 'dih Interior Homes Decor..!');
}

}
