import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  items_l=[
    {name:"Cake",price:"4.99",cat:"Bakery",count:1},
    {name:"Bread",price:"2.55",cat:"Bakery",count:100},
    {name:"Donut",price:"3.99",cat:"Bakery",count:1},
    {name:"Cake",price:"4.99",cat:"Bakery",count:1},
    {name:"Bread",price:"2.55",cat:"Bakery",count:1},
    {name:"Donut",price:"3.99",cat:"Bakery",count:1}
  ]

}
