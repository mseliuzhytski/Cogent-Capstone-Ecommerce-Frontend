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
          const order = {"productId":sale.product.id,"productName":sale.product.name,"quantity":sale.quantitySold,"totalPrice":sale.totalPrice,"time":sale.timeRecorded}
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
