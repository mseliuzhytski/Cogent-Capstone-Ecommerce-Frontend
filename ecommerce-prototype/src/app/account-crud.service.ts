import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountCrudService {

  private url = "http://localhost:8080/";

  private products = [];

  constructor(private http : HttpClient) { }

  getAccounts() : Observable<any> {
    return this.http.get(this.url + "account/list");
  }

}
