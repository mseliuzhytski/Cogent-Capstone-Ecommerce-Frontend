import { Component, OnInit } from '@angular/core';
import { Product } from '../dto/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Category } from '../dto/category';
import { error } from 'console';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent implements OnInit{

  productId:number
  productToDisplay: Product

  constructor(private route:ActivatedRoute,private productService:ProductService){

  }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('productId')
    this.productId = Number(id)
    console.log(this.productId);

    this.productService.getProduct(id).subscribe(
      productResponse=>{
        console.log(productResponse)
        const product = new Product(productResponse.id,productResponse.name,productResponse.price,
           productResponse.stock,null,productResponse.details,productResponse.imageLocation,productResponse.dateAdded,[]);
           if(productResponse.categoriesList){
            product.category = productResponse.categoriesList.map(
              category =>{
                
                const categoryinst = new Category(category.id,category.name);
                product.categoryNames.push(category.name)
                return categoryinst;
              }
            );}
            this.productToDisplay = product;
        console.log(product)
      },error=>{
        console.error(error)
      },()=>{
        this.displayProduct()
      }
    )
  }

  display = false;

  displayProduct(){
    this.display = true;
    console.log(this.productToDisplay)
  }


}
