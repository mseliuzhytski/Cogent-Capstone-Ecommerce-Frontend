import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../dto/product';
import { Category } from '../dto/category';
import { error } from 'console';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{


  array:number[]=[]
  show = false;

  constructor(private productService:ProductService){
    
  }

  productsList:Product[]=[]

  ngOnInit(): void {

    // let temp = [];
    // for(let i=0;i<=25;i++){
    //   this.array[i]=i;
    // }
    //gets all the products from service request
    this.productService.getAllProducts().subscribe(
      productResponse=>{
        //used to get each product and its details and mapping it to product dto
        for(const response of productResponse){
          const product = new Product(response.id,response.name,response.price,
            response.stock,null,response.details,response.imageLocation,response.dateAdded);
            //setting categories
            if(response.categoriesList){
              product.category = response.categoriesList.map(
                category =>{
                  
                  const categoryinst = new Category(category.id,category.name);
                  return categoryinst;
                }
              );
            }
            console.log(product)
            this.productsList.push(product);//ERROR HERE
        }
      },error =>{
        //handle somehow on DOM
        console.log("ERROR OCCURED")
      },()=>{
        this.displayProducts(this.productsList)
      }
    )
  }

  displayReady = false

  displayProducts(products){
    this.displayReady = true
    console.log(products)
  }

  update(){

    this.show=true;
    
  }



}
