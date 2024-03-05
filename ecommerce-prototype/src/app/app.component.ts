import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './dto/category';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-prototype';

  constructor(private authService : AuthServiceService,private categoryService:CategoryService,private router:Router) {}

  categoriesForNav:Category[]=[]

  isAdminAccount = false;
  isLoggedIn = false;
  account = null;

  destroyer$: Subject<void> = new Subject();

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  ngOnInit(): void {

    this.categoryService.getAllCategories().subscribe(
      categoryResponse=>{
        //console.log(categoryResponse)
        let count = 0
        for(const category of categoryResponse){
          if(count<7){
          const catToAdd = new Category(category.id,category.name);
          //console.log(catToAdd)
          this.categoriesForNav.push(catToAdd);
          count++;
          }else{
            break;
          }
        }
      },error=>{
        console.error(error);
      },()=>{
        this.updateNav()
      }
    )

    this.authService.account.pipe(takeUntil(this.destroyer$)).subscribe(newAcc => {
      this.account = newAcc;
      if (newAcc != null) {
        this.isLoggedIn = true;
        this.isAdminAccount = newAcc["admin"];
      } else {
        this.isLoggedIn = false;
        this.isAdminAccount = false;
      }
    });
    this.authService.updateLoginInfo();
  }

  updateLoggedInStatus() : void {


    console.log("update logged in status");
    this.authService.getLoggedInAccount().subscribe((account) =>
      (account) => {
        this.account = account;
        this.isLoggedIn = true;
        this.isAdminAccount = this.account['admin'];
        console.log("logged in");
        console.log(account);
      },
      (err) => {
        this.account = null;
        this.isLoggedIn = false;
        this.isAdminAccount = false;
        console.log("error login");
      },
      () => {

      });
  }


  display = false

  updateNav(){

    this.display = true;
    //console.log(this.categoriesForNav)

  }

  navigateToProducts(categoryName){

    this.router.navigate(['/shopAll', categoryName]);

  }





}
