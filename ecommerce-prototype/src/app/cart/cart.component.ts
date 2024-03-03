import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { CartService } from '../cart.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private authService:AuthServiceService,private cartService:CartService,private router: Router) { }

  display = false;
  totalPrice:number = 0
  totalItems:number = 0
  testarray:any=[]

  ngOnInit() {

    this.cartService.getCart().subscribe(
      response=>{
        console.log(response)

        for(const array of response){

          console.log("Response",array.product) // this returns the specific index but i cant iterate through this "array" variable
          this.totalPrice = this.totalPrice + (array.product.price*array.quantity)
          this.totalItems +=array.quantity
          const saleItem = {"product":array.product,"quantity":array.quantity,"changeQuantity":array.quantity}
          console.log("SALE ITEM",saleItem)
          this.testarray.push(saleItem);
        }

      }, 
      error =>{
        this.router.navigate(['/login']);
      }
      ,()=>{
        this.display=true;
        console.log(this.testarray)
        console.log(this.totalPrice)
      }
    )   
  }

  quantityOptions(stock:number){

    const arrayOfStock = []

    for(let i = 1;i<=stock;i++){
      arrayOfStock.push(i);
    }

    return arrayOfStock;
  }

  // items_l=[
  //   {name:"Cake",price:"4.99",cat:"Bakery",count:1},
  //   {name:"Bread",price:"2.55",cat:"Bakery",count:100},
  //   {name:"Donut",price:"3.99",cat:"Bakery",count:1},
  //   {name:"Cake",price:"4.99",cat:"Bakery",count:1},
  //   {name:"Bread",price:"2.55",cat:"Bakery",count:1},
  //   {name:"Donut",price:"3.99",cat:"Bakery",count:1}
  // ]

  updateCart(cartItem){

    console.log(cartItem.changeQuantity)
    //update cart call -> refresh cart page
    this.cartService.updateCart(cartItem.product.id,cartItem.changeQuantity).subscribe(
      undefined
      ,error =>console.error(error)
      ,()=>{
        window.location.reload();
      })
  }

  removeItem(cartItem){

    console.log(cartItem)
    this.cartService.removeFromCart(cartItem.product.id).subscribe(
      undefined,
      error=>console.error(error),
      ()=>{
        window.location.reload();
      }
    )
  }

  submitOrder(arrayOfProducts){

    //console.log(arrayOfProducts)
    let formattedList = []
    for(let x of arrayOfProducts){
      //console.log(x);
      const salesItem = {"productId":x.product.id, "quantitySold": x.quantity, "totalPrice":x.product.price*x.quantity}
      //console.log(salesItem)
      formattedList.push(salesItem);
    }
    //console.log("JSON: ",formattedList)

    this.cartService.createSale(formattedList).subscribe(
      undefined,
      error=>console.error(error),
      ()=>{
        window.location.reload();
      }
    )

  }

}
