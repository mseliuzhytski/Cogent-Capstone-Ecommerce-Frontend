import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SalesReportService } from '../../../sales-report.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sales-user-table',
  templateUrl: './sales-user-table.component.html',
  styleUrl: './sales-user-table.component.css'
})
export class SalesUserTableComponent {

  dataSource : any;
  salesItems = [];
  columns = ["username", "total_price", "purchases"];

  @ViewChild(MatPaginator)
  paginator : MatPaginator;

  constructor(private service : SalesReportService) {
  }

  applyFilter(filterValue : string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public setItems() {
    this.service.getSalesReportsByUser().subscribe( value => {
      this.salesItems = value;
      this.dataSource = new MatTableDataSource(this.salesItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  public getPrice(value : number) {
    return "$" + value.toFixed(2);
  }

}
