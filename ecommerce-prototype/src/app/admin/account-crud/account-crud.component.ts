import { AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AccountTableComponent } from './account-table/account-table.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { DiscountTableComponent } from './discount-table/discount-table.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { Observable, timer } from 'rxjs';
import { AccountCrudService } from '../../account-crud.service';

@Component({
  selector: 'app-account-crud',
  templateUrl: './account-crud.component.html',
  styleUrl: './account-crud.component.css'
})
export class AccountCrudComponent implements AfterViewInit {

  // Flags for indicating whether we should show the given panel
  showAccountTable : boolean = false;
  showAccountForm : boolean = false;
  showIsAccountFormEdit : boolean = false;
  showDiscountTable : boolean = false;
  showDiscountForm : boolean = false;
  showIsDiscountFormEdit : boolean = false;

  @ViewChild(AccountTableComponent)
  accountTableComponent : AccountTableComponent;
  @ViewChild(AccountFormComponent)
  accountFormComponent : AccountFormComponent;
  @ViewChild(DiscountTableComponent)
  discountTableComponent : DiscountTableComponent;
  @ViewChild(DiscountFormComponent)
  discountFormComponent : DiscountFormComponent;

  constructor(private service : AccountCrudService) {
  }

  ngAfterViewInit(): void {
    this.viewAccountOption(null);
  }


  clearView() {
    this.showAccountTable = false;
    this.showAccountForm = false;
    this.showIsAccountFormEdit = false;
    this.showDiscountTable = false;
    this.showDiscountForm = false;
    this.showIsDiscountFormEdit = false;
  }

  // Methods for showing the different views
  public handleAccountChildEmitter(e : string) {
    if (e == 'view') {
      this.viewAccountOption(null);
    } else if (e == 'add') {
      this.addAccountOption(null);
    }
  }

  public viewAccountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showAccountTable = true;

    const source = timer(1000);
    const subscribe = source.subscribe(val => {
      console.log(val);
      this.accountTableComponent.setAccounts();
    });

  }

  public addAccountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showAccountForm = true;
    if (this.accountFormComponent != null) {
      this.accountFormComponent.showIsEdit = false;
      this.accountFormComponent.initializeForm();
      this.accountFormComponent.clearView();
    }
  }

  public editAccountOption(id) {
    this.clearView();
    this.showAccountForm = true;
    this.showIsAccountFormEdit = true;
    this.service.getAccount(id).subscribe(account => {
      console.log(account);
      this.accountFormComponent.showIsEdit = true;
    })
  }

  public handleDiscountChildEmitter(e : string) {
    if (e == 'view') {
      console.log("view");
      this.viewDiscountOption(null);
    } else if (e == 'add') {
      console.log("add");
      this.addDiscountOption(null);
    }
  }

  public viewDiscountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showDiscountTable = true;
    const source = timer(1000);
    const subscribe = source.subscribe(val => {
      this.discountTableComponent.setDiscounts();
    });
  }

  public addDiscountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showDiscountForm = true;
    if (this.discountFormComponent != null) {
      this.discountFormComponent.clearView();
    }
  }

}
