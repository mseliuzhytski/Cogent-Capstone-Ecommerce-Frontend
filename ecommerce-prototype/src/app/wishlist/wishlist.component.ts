import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { wishlistItem } from '../dto/wishlistItem';
import { error } from 'console';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthServiceService } from '../auth-service.service';
import { Product } from '../dto/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  l_wish:wishlistItem[]=[]

  constructor(private wish_l_res:WishlistService,private cart_res:CartService,private router: Router){}

  ngOnInit(): void {
    this.wish_l_res.getWishlist().subscribe(response => {
      //console.log(response)
      for(let i in response){
        this.l_wish[i]=response[i]
        //console.log(this.l_wish[i])
      }
    },error =>{
      console.error(error)
      //this.router.navigate(['/login'])
    })
  }

  addButton(item:Product){
    //console.log(item)
      this.cart_res.addToCart(item.id,1).subscribe(
        response => console.log(response)
      );
      this.removeButton(item)
  }

  removeButton(item:Product){
    this.wish_l_res.deleteWishlistItem(item).subscribe(
      undefined
      ,error=>console.error(error),
      ()=>{
        //window.location.reload();
        this.router.navigate(['wishlist'])
      })
  }

  routeItem(id:number):void{
    console.log("hi")
    this.router.navigate(['/productPage', id])
  }

}
