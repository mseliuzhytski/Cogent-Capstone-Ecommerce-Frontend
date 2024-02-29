import { Component } from '@angular/core';
import { AccountCrudService } from '../../../account-crud.service';
import { MatDialog } from '@angular/material/dialog'
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
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

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  constructor(private service : AccountCrudService) {
  }

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setAccounts() {
    this.service.getAccounts().subscribe( value => {
      this.accounts = value;
      this.dataSource = new MatTableDataSource(this.accounts);
      this.dataSource.paginator = this.paginator;
    });
  }

}
