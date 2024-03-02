import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-prototype';

  constructor(private authService : AuthServiceService) {

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




}
