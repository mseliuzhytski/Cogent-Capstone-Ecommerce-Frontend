import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { CartService } from '../cart.service';
import { error } from 'console';
import { Router } from '@angular/router';
import { response } from 'express';
import { DiscountService } from '../discount.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  constructor(private authService:AuthServiceService,private cartService:CartService,private router: Router,private discountService:DiscountService) { }

  display = false;
  totalPrice:number = 0
  totalItems:number = 0
  testarray:any=[]
  accountId:number

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
          this.accountId = array.account.id
        }

      }, 
      error =>{
        this.router.navigate(['/login']);
      }
      ,()=>{
        this.display=true;
        console.log(this.testarray)
        console.log(this.totalPrice)
        console.log("ID",this.accountId)
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

  discountCode = ''
  discountPercent:number
  discountApplied = false;
  finalDiscountCode = ''

  checkDiscount(code){
    console.log("discount:",code)
    this.discountService.checkDiscount(this.accountId,code).subscribe(
      response=>{
        if(response!=false){
          this.discountApplied=true;
          this.discountPercent = response;
        }
      }
      ,error=>console.error(error),
      ()=>{
        console.log(this.discountPercent)
        this.showPriceChanges()
        this.finalDiscountCode = code
      }
    )
  }

  discountPrice:number

  showPriceChanges(){
    console.log((this.discountPercent/100)*this.totalPrice)
    const discount = (this.discountPercent/100)*this.totalPrice
    this.discountPrice = this.totalPrice-discount;
  }

  submitOrder(arrayOfProducts){

    let price = 0;

    if(this.discountApplied){
      price = this.discountPrice
    }else{
      price = this.totalPrice
    }

    //console.log(arrayOfProducts)
    let formattedList = []
    for(let x of arrayOfProducts){
      //console.log(x);
      const salesItem = {"productId":x.product.id, "quantitySold": x.quantity, "totalPrice":price}
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

    if(this.discountApplied){
      this.discountService.useDiscount(this.accountId,this.finalDiscountCode).subscribe(
        response=>console.log(response)
      )
    }

  }

  goToProductPage(id:number){

    this.router.navigate(['/productPage',id])

  }

  // stops click from going to product page:
  stopPropagation(event:Event){
    event.stopPropagation();
  }

}
