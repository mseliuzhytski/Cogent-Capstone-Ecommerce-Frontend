import { Component, OnInit } from '@angular/core';
import { Product } from '../dto/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Category } from '../dto/category';
import { error } from 'console';
import { AuthServiceService } from '../auth-service.service';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import { ProductDialogComponent } from '../admin/product-crud/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductalertComponent } from './productalert/productalert.component';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css'
})
export class ProductpageComponent implements OnInit{

  productId:number
  productToDisplay: Product

  constructor(private route:ActivatedRoute,private productService:ProductService, private authService:AuthServiceService,
    private router: Router,private cartService:CartService, private wishService:WishlistService, private dialog:MatDialog){

  }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('productId')
    this.productId = Number(id)
    console.log(this.productId);

    this.productService.getProduct(id).subscribe(
      productResponse=>{
        //console.log(productResponse)
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
        //console.log(product)
      },error=>{
        console.error(error)
      },()=>{
        this.displayProduct()
      }
    )
  }

  display = false;
  quantityArray:number[]=[]
  selectedQuantity:number

  displayProduct(){
    if(this.productToDisplay.stock!=0){
    for(let i=1;i<=this.productToDisplay.stock;i++){
      this.quantityArray.push(i);
    }
    }
    this.display = true;
    //console.log(this.productToDisplay)
  }



  addToCart(){
    this.processCartRequest();
    //console.log(this.selectedQuantity)
  }

  addToWishlist(){
    console.log("test")
    this.wishService.addToWishlist(this.productId).subscribe(response =>{
      this.openDialog("Product added to wish list!")
      },
    error=>{
      if(error.status==400){
        this.openDialog("Product is already in wishlist")
      }else{
        this.openDialog("Not Logged in!")
        this.router.navigate(['/login']);
      }
    }
  );
  }

  processCartRequest(){
    //console.log("called")
    //console.log(this.selectedQuantity);
    let add = true;
    if(this.selectedQuantity==undefined){
      if(this.productToDisplay.stock<1){
        this.openDialog("Not in stock!")
      }else{
        this.openDialog("Please Select Quantity")
      }
      add= false;
    }

    if(add){
      this.cartService.addToCart(this.productId,this.selectedQuantity).subscribe(
      response => {
        this.openDialog("Product added to cart!")
      },
      error=>{
        if(error.status==400){
          this.openDialog("Product is already in cart")
        }else{
          this.openDialog("Not Logged in!")
          this.router.navigate(['/login']);
        }
      }
    );
  }
  }



  //TODO: mat alert/dialog logic here: 

  openDialog(data:string) {
    const dialogRef = this.dialog.open(ProductalertComponent, {
      data: data,width: '250px',height: '200px'
    });
  }


}
