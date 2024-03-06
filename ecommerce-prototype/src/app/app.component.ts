import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
    private router: Router) {
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

  isAdminAccount = false;
  isLoggedIn = false;
  account = null;

  destroyer$: Subject<void> = new Subject();

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  ngOnInit(): void {
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




}
