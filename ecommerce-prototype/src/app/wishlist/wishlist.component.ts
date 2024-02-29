import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  l_wish=[{name:"Cake",price:"4.99",cat:"Bakery"},{name:"Bread",price:"2.55",cat:"Bakery"},{name:"Donut",price:"3.99",cat:"Bakery"}]

}
