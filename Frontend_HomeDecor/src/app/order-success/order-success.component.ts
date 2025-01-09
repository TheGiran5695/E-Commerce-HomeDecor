import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit{

  // successIMG: string = "https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif"
  Logo:string = "https://interiorhomesdecor.com/assets/images/logo.png"
  successIMG: string = "https://salesloopx.com/images/ce46d9_3f38fd870f0e44df928485e2e1c7686b_mv2.gif"

  orderId = '';

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
      this.route.params.subscribe((data) => {
        this.orderId = data['id']
      })
  }

}
