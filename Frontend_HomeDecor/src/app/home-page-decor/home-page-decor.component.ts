import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { CartService } from '../cart.service'; // Import your cart service
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page-decor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home-page-decor.component.html',
  styleUrl: './home-page-decor.component.css'
})
export class HomePageDecorComponent implements OnInit{

  

  wallImage: string = "https://c0.wallpaperflare.com/preview/226/318/321/apartment-clean-condominium-contemporary.jpg"



  col1:string="https://png.pngtree.com/png-vector/20230516/ourmid/pngtree-limited-time-offer-logo-design-discount-banner-shape-vector-png-image_7099498.png"
  col2:string="https://freepngimg.com/thumb/best_quality/7-2-best-quality-png-image.png"

  premium1:string = "https://png.pngtree.com/png-vector/20221221/ourmid/pngtree-realistic-best-quality-badge-with-round-shape-gold-color-png-image_6532360.png"
  premium2:string = "https://png.pngtree.com/png-clipart/20230529/original/pngtree-special-offer-vector-free-download-png-image_9173640.png"
  premium3:string = "https://png.pngtree.com/png-clipart/20240311/original/pngtree-customer-service-and-support-png-image_14564524.png"
  premium4:string = "https://png.pngtree.com/png-clipart/20240603/original/pngtree-free-delivery-truck-icon-png-image_15236455.png"
  premium5:string = "https://png.pngtree.com/png-clipart/20230805/original/pngtree-handshake-orange-icon-paper-hands-sign-vector-picture-image_9669359.png"
  preimium:string="https://freepngimg.com/thumb/best_quality/7-2-best-quality-png-image.png"

  Logo:string = "https://interiorhomesdecor.com/assets/images/logo.png"

  img1:string = "https://img.lovepik.com/bg/20240502/3d-render-of-a-modern-dining-room-with-gray-table_8482571_wh860.jpg!/fw/860"
  img2:string = "https://w0.peakpx.com/wallpaper/548/427/HD-wallpaper-modern-design-architecture-house-interior-home-design-sofa.jpg"
  img3:string = "https://5.imimg.com/data5/SELLER/Default/2024/9/453066656/OB/PX/LT/193684312/imported-beds-500x500.jpg"
  img4:string = "https://image.made-in-china.com/2f0j00cRAqMlBDZHoT/Modern-Style-Wooden-Melamine-Home-Use-Furniture-Combination-TV-Stand-Coffee-Table-Set.webp"
  img5:string = "https://png.pngtree.com/background/20231117/original/pngtree-art-deco-sofa-set-with-side-tables-and-lamps-featuring-high-picture-image_6299930.jpg"
  img6:string = "https://images.woodenstreet.de/image/cache/data%2Fwooden-sofa%2Fmarriott-wooden-sofa%2Frevised%2Frevised-looks%2Fwalnut%2Fupdated%2F121-750x650.jpg"
  img7:string = "https://5.imimg.com/data5/SELLER/Default/2023/1/JM/UW/KS/182252055/whatsapp-image-2022-11-02-at-2-49-47-pm-500x500.jpeg"
  img8:string = "https://as2.ftcdn.net/v2/jpg/05/51/69/95/1000_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

  socImg1:string = "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/62-instagram-512.png"
  socImg2:string = "https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
  socImg3:string = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
  socImg4:string = "https://static.vecteezy.com/system/resources/previews/023/986/562/non_2x/telegram-logo-telegram-logo-transparent-telegram-icon-transparent-free-free-png.png"
  socImg5:string = "https://static.vecteezy.com/system/resources/previews/023/986/964/non_2x/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png"


  demoImg1:string = "https://3.imimg.com/data3/BF/FE/MY-13157930/interior-design-hd-wallpapers.jpg"
  demoImg2:string = "https://img.freepik.com/premium-photo/orange-mock-up-wall-with-orange-sofa-modern-interior-background-living-room-scandinavian-style_354831-4508.jpg"


  Followers:string = "2532"
  Items:string = "456"
  Customer:string = "298"
  
  constructor(private toastr: ToastrService, private cartService: CartService){

  }
  ngOnInit(): void {
      this.onWindowScroll()
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const overlapContainer = document.getElementById('overlapContainer');
    const scrollPosition = window.scrollY;

    if (overlapContainer) {
      if (scrollPosition > 100) {
        overlapContainer.style.top = '90%'; // Move down
        overlapContainer.style.transform = 'translate(-50%, 0)';
      } else {
        overlapContainer.style.top = '100%'; // Reset position
        overlapContainer.style.transform = 'translate(-50%, -50%)';
      }
    }
  }


  

}
