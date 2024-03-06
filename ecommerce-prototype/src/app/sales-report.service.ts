import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {

  private salesReportUrl = environment.sales_url + "salesreport/";

  private products = [];

  constructor(private http : HttpClient) { }

  getSalesReports() : Observable<any> {
    return this.http.get(this.salesReportUrl + "getAll");
  }

  getSalesReportsByUser() : Observable<any> {
    return this.http.get(this.salesReportUrl + "aggregateByUser");
  }

  getSalesReportByUserTime(timeInterval) : Observable<any> {
    const path = this.salesReportUrl + "aggregateByUserTimeFilter";
    const headers = { 'content-type': 'application/json'}
    return this.http.post(path, timeInterval, {'headers' : headers});
  }

}
