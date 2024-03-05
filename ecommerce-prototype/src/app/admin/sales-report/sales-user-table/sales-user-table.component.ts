import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SalesReportService } from '../../../sales-report.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { time } from 'console';
@Component({
  selector: 'app-sales-user-table',
  templateUrl: './sales-user-table.component.html',
  styleUrl: './sales-user-table.component.css',
  providers: [provideNativeDateAdapter()],
})
export class SalesUserTableComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  public filterByDate(event : Event) {
    let startDate = new Date(this.range.get("start").value).getTime();
    let endDate = new Date(this.range.get("end").value).getTime();
    let timeInterval = {};
    timeInterval['startTime'] = startDate;
    timeInterval['endTime'] = endDate;
    this.service.getSalesReportByUserTime(timeInterval).subscribe( value => {
      this.salesItems = value;
      this.dataSource = new MatTableDataSource(this.salesItems);
      this.dataSource.paginator = this.paginator;
    })
  }
}
