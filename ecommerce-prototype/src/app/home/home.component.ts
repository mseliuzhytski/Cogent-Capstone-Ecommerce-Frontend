import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  l_cat = ["Bakery", "Books", "Makeup", "Pastery"]


  l_itm = [[{name:"Cake",price:"4.99",cat:"Bakery"},{name:"Bread",price:"2.55",cat:"Bakery"},{name:"Donut",price:"3.99",cat:"Bakery"}],
            [{name:"Avatar",price:"20.00",cat:"Books"},{name:"Mockingjay",price:"19.99",cat:"Books"}],
            [],
            []
           ]

  logmsg(msg?:string){
    console.log("logged" || msg)
  }
  scrollToFeatures(){
    window.document.getElementById("scrolltxt").scrollIntoView()
  }
}
