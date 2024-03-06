import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
  environmentTitle = environment.environmentName;

  constructor(private authService : AuthServiceService,
    private matIconRegistry : MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private categoryService:CategoryService) {
    this.matIconRegistry.addSvgIcon(
      'heart_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/heart.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'user_profile_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/profile.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'shopping_cart_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/cart.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'login_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/login.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'logout_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/logout.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'home_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/home.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'shop_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/shop.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'about_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/about.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'contact_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/contact.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'admin_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/admin.svg")
    );
  }

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

  logout(event : Event){
    event.preventDefault();
    console.log("logout");
    this.authService.removeToken();
    this.router.navigate(['/login']);
    this.authService.updateLoginInfo();
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
