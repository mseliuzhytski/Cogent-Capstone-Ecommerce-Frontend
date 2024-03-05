import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SalesItemTableComponent } from './sales-item-table/sales-item-table.component';
import { SalesUserTableComponent } from './sales-user-table/sales-user-table.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent implements AfterViewInit {

  public showSalesItemTable : boolean = false;
  public showSalesUserTable : boolean = false;

  @ViewChild(SalesItemTableComponent)
  salesItemTableComponent : SalesItemTableComponent;

  @ViewChild(SalesUserTableComponent)
  salesUserTableComponent : SalesUserTableComponent;

  ngAfterViewInit(): void {
    this.viewAllOption();
  }

  public clearView() {
    this.showSalesItemTable = false;
    this.showSalesUserTable = false;
  }

  public viewAllOption() {
    this.clearView();
    this.showSalesItemTable = true;
    const source = timer(1000);
    const subscribe = source.subscribe(val => {
      this.salesItemTableComponent.setItems();
    });
  }

  public viewByUserOption() {
    this.clearView();
    this.showSalesUserTable = true;
    const source = timer(1000);
    const subscribe = source.subscribe(val => {
      this.salesUserTableComponent.setItems();
    });
  }

}
