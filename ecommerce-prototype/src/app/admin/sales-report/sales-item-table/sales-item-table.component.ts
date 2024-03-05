import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SalesReportService } from '../../../sales-report.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sales-item-table',
  templateUrl: './sales-item-table.component.html',
  styleUrl: './sales-item-table.component.css'
})
export class SalesItemTableComponent {

  dataSource : any;
  salesItems = [];
  columns = ["username", "product_name", "price", "quantity", "date_added"];

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  constructor(private service : SalesReportService) {
  }

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setItems() {
    this.service.getSalesReports().subscribe( value => {
      this.salesItems = value;
      this.dataSource = new MatTableDataSource(this.salesItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  public getFormattedDate(timestamp : number) {
    let date = new Date(timestamp);
    return date.toLocaleString();
  }

  public getPrice(value : number) {
    return "$" + value.toFixed(2);
  }


}
