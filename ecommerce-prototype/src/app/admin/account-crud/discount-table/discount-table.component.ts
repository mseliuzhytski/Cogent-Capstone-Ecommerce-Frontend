import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AccountCrudService } from '../../../account-crud.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-discount-table',
  templateUrl: './discount-table.component.html',
  styleUrl: './discount-table.component.css'
})
export class DiscountTableComponent {

  dataSource : any;
  discounts = [];
  discountColumns = ["id", "code", "percent"];

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  @Output()
  editEvent = new EventEmitter<Number>

  editDiscount(id : number) {
    this.editEvent.emit(id);
    console.log("emit event");
  }

  constructor(private service : AccountCrudService) {
  }

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setDiscounts() {
    this.service.getDiscounts().subscribe( value => {
      this.discounts = value;
      this.dataSource = new MatTableDataSource(this.discounts);
      this.dataSource.paginator = this.paginator;
    });
  }

}
