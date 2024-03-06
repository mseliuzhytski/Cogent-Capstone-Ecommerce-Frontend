import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../dto/product';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private products_res:ProductService,private cat_res:CategoryService, private router: Router){}

  category_list:any=[]
  catSet:Set<String>= new Set();
  items_list=[]
  ll_itm:Product[][]=[]
  cat_map_index = new Map<string,number>()
  cat_map_size = new Map<string,number>()

  ngOnInit(): void {
    this.products_res.getAllProducts().subscribe(data => {
      this.items_list=data
      //console.log(this.items_list)
    },error =>{
      console.log("ERROR OCCURED GET PRODUCTS")
    },()=>{
      this.fillDoubleArray()
    })

    this.cat_res.getAllCategories().subscribe(data1 => {//console.log(data))
      //console.log(data1)
      this.category_list = data1
    },error =>{
      console.log("ERROR OCCURED GET CATERORIES")
    })
  }

  fillDoubleArray(){
    let arri=0
    for(let p of this.items_list){
      //console.log(p.categoriesList)
      if(p.categoriesList.length > 0){
        for(let i of p.categoriesList){
          //console.log("i: ")
          //console.log(i.name)
          let hasKey = this.cat_map_index.has(i.name)
          if(hasKey){
            if(this.cat_map_size.get(i.name) < 7){
              let size = this.cat_map_size.get(i.name)
              this.cat_map_size.set(i.name,size+1)
              this.ll_itm[this.cat_map_index.get(i.name)][this.cat_map_size.get(i.name)]=p
            }
          } else {
            this.cat_map_index.set(i.name,arri)
            this.ll_itm[arri]=[]
            arri++
            this.cat_map_size.set(i.name,0)
            this.ll_itm[this.cat_map_index.get(i.name)][this.cat_map_size.get(i.name)]=p
          }
        }
      }
    }
    //console.log(this.ll_itm)
  }
  catListToSet(){

  }

  routeItem(id:number):void{
    this.router.navigate(['/productPage', id]);
  }

  logmsg(msg?:string){
    console.log("logged" || msg)
  }
  scrollToFeatures(){
    window.document.getElementById("scrolltxt").scrollIntoView()
  }
}
