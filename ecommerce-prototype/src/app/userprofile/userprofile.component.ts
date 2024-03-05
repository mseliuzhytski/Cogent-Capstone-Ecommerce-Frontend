import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit{

  username:string = ''
  display = false;

  constructor(private authService: AuthServiceService, private router: Router, private cartService:CartService) {
    
  }
  ngOnInit(): void {
    
    this.authService.isLoggedIn()
    .subscribe(isLoggedIn => {
      console.log(isLoggedIn);
      if(!isLoggedIn){
        this.router.navigate(['/login']);
      }},
      undefined,
      ()=>{
        this.populateViewForProfile()
      });
  }

  ordersArray:any=[]
  totalSpent = 0

  populateViewForProfile(){
    this.authService.getLoggedinUsername().subscribe(
      response=>this.username=response
    )
    this.cartService.getUserOrders().subscribe(
      response =>{
        for(let sale of response){
          var myDate = new Date( sale.timeRecorded *1000)
          var day = myDate.getDate();
          var month = myDate.getMonth() + 1;
          var formattedDate = day + "/" + month;
          const order = {"productId":sale.product.id,"productName":sale.product.name,"quantity":sale.quantitySold,
          "productPrice":sale.product.price,"totalPrice":sale.totalPrice,"time":formattedDate,"img":sale.product.imageLocation}
          this.totalSpent+=sale.totalPrice
          this.ordersArray.push(order)
        }
      }
      ,undefined
      ,()=>{
        this.display=true
      }
    )
    console.log(this.username);
  }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['/login']);
    this.authService.updateLoginInfo();

  }

}
