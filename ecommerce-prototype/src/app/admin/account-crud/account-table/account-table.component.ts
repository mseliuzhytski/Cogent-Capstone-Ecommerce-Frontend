import { Component, EventEmitter, Output } from '@angular/core';
import { AccountCrudService } from '../../../account-crud.service';
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.css',
  providers: [AccountCrudService]
})
export class AccountTableComponent {

  dataSource : any;
  accounts = [];
  accountColumns = ["id", "username", "email", "discount"];

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  @Output()
  editEvent = new EventEmitter<Number>

  editAccount(id : number) {
    this.editEvent.emit(id);
    console.log("emit event");
  }

  constructor(private service : AccountCrudService) {
  }

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setAccounts() {
    this.service.getAccounts().subscribe( value => {
      this.accounts = [];
      for (let i = 0; i < value.length; i++) {
        let acc = value[i];
        if (acc['admin'] == false) {
          this.accounts.push(acc);
        }
      }
      this.dataSource = new MatTableDataSource(this.accounts);
      this.dataSource.paginator = this.paginator;
    });
  }

  public getDiscountCode(account) {
    if (account['discount'] != null) {
      return account['discount']['discountCode'] + " (" + account['discount']['discountPercent'] + "%)";
    } else {
      return "";
    }
  }

}
