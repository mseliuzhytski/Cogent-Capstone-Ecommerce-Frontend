import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../dto/product';
import { Category } from '../dto/category';
import { error } from 'console';
import { PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{


  array:number[]=[]
  show = false;
  placeholder='Search'
  displayFiltersBool = false

  constructor(private productService:ProductService,private router: Router,private categoryService:CategoryService){}

  productsList:Product[]=[]
  filteredProducts:Product[]=[]
  categoriesList:Category[]=[]

  ngOnInit(): void {
    //gets all the products from service request
    this.productService.getAllProducts().subscribe(
      productResponse=>{
        //used to get each product and its details and mapping it to product dto
        for(const response of productResponse){
          const product = new Product(response.id,response.name,response.price,
            response.stock,null,response.details,response.imageLocation,response.dateAdded,[]);
            //setting categories
            if(response.categoriesList){
              product.category = response.categoriesList.map(
                category =>{
                  const categoryinst = new Category(category.id,category.name);
                  product.categoryNames.push(category.name);
                  return categoryinst;
                }
              );
            }
            console.log(product.categoryNames)
            this.productsList.push(product);
        }
      },error =>{
        //handle somehow on DOM
        console.log("ERROR OCCURED")
      },()=>{
        this.displayProducts(this.productsList)
        this.filteredProducts = this.productsList
        this.sliceData()
      }
    )

    //get all categories for filtering
    this.categoryService.getAllCategories().subscribe(
      categoryResponse=>{
        for(const category of categoryResponse){
          const add = new Category(category.id,category.name);
          this.categoriesList.push(add)
        }
      },error=>console.error(error),
      ()=>{
        this.displayFilters()
        //console.log(this.categoriesList)
      }
    )


  }

  displayReady = false

  displayProducts(products){
    this.displayReady = true
    //console.log(products)
  }

  update(){

    this.show=true;
    
  }


  // PAGINATION LOGIC
   pageSize = 2
   currentPage = 1
   currentPageData=[]
   showPaginator = false

   sliceData(){
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.currentPageData = this.filteredProducts.slice(startIndex, endIndex);
    this.showPaginator = true
   }

   onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // Update current page
    this.sliceData(); // Update current page data
  }

  onProductClick(id){

    console.log(id)
    this.router.navigate(['/productPage', id]);

  }



  //SEARCH
  value = 'Search'
  search(toSearch:string){

    if(!toSearch) return;

    this.filteredProducts = this.productsList.filter(
      query=>{
        return query.name.toLowerCase().includes(toSearch.toLowerCase()) || query.details.toLowerCase().includes(toSearch.toLowerCase())
      }
    )
    console.log(toSearch)
    console.log("FILTERD: ",this.filteredProducts)
    if(this.filteredProducts.length<20){
      this.pageSize = this.filteredProducts.length
    }else{
      this.pageSize = 20
    }

    this.sliceData()

  }

  //Filter By categories

  displayFilters(){
    this.displayFiltersBool = true;
  }

  filterByCat(category:Category){

    console.log(category)

    this.filteredProducts = this.productsList.filter(
      filter=>{
        return filter.categoryNames.includes(category.name)
      }
    )

    this.sliceData()
  }

  reset(){
    this.filteredProducts = this.productsList;
    this.sliceData();
  }


  //sorting
  
  sorting(sortCondition,sortOrder){

    this.filteredProducts = this.filteredProducts.sort((a,b)=>{

      if(sortCondition == "price"){

        return sortOrder == "asc" ? a.price-b.price : b.price - a.price

      } else if(sortCondition == "date" ){
        return sortOrder == "asc" ? a.dateAdded-b.dateAdded : b.dateAdded - a.dateAdded
      } else if( sortCondition == "name"){
        return sortOrder == "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
    })
    this.sliceData();
  }




}
