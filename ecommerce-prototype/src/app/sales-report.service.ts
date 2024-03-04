import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {

  private url = "http://localhost:8080/";
  private salesReportUrl = this.url + "salesreport/";

  private products = [];

  constructor(private http : HttpClient) { }

  getSalesReports() : Observable<any> {
    return this.http.get(this.salesReportUrl + "getAll");
  }

  getSalesReportsByUser() : Observable<any> {
    return this.http.get(this.salesReportUrl + "aggregateByUser");
  }

}