import { Component } from '@angular/core';

@Component({
  selector: 'app-account-crud',
  templateUrl: './account-crud.component.html',
  styleUrl: './account-crud.component.css'
})
export class AccountCrudComponent {

  // Flags for indicating whether we should show the given panel
  showAccountTable : boolean = false;
  showAccountForm : boolean = false;
  showIsAccountFormEdit : boolean = false;
  showDiscountTable : boolean = false;
  showDiscountForm : boolean = false;
  showIsDiscountFormEdit : boolean = false;

  clearView() {
    this.showAccountTable = false;
    this.showAccountForm = false;
    this.showIsAccountFormEdit = false;
    this.showDiscountTable = false;
    this.showDiscountForm = false;
    this.showIsDiscountFormEdit = false;
  }

  // Methods for showing the different views
  public viewAccountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showAccountTable = true;
  }

  public addAccountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showAccountForm = true;
  }

  public viewDiscountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showDiscountTable = true;
  }

  public addDiscountOption(event : Event) {
    if (event != null) {
      event.preventDefault();
    }
    this.clearView();
    this.showDiscountForm = true;
  }

}
