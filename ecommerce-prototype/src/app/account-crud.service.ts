import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountCrudService {

  private url = "http://localhost:8080/";
  private accountUrl = this.url + "account/";
  private discountUrl = this.url + "discount/";

  private products = [];

  constructor(private http : HttpClient) { }

  getAccounts() : Observable<any> {
    return this.http.get(this.accountUrl + "list");
  }

  getAccount(id : number) : Observable<any> {
    return this.http.get(this.accountUrl + id);
  }

  addAccount(account : any) :Observable<Object> {
    const path = this.accountUrl;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const headers = { 'content-type': 'application/json'}
    return this.http.post(path, account, {'headers' : headers});
  }

  editAccount(account : any, id : number) : Observable<Object> {
    account['id'] = id;
    const path = this.accountUrl + id;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const headers = { 'content-type': 'application/json'}
    return this.http.put(path, account, {'headers' : headers});
  }

  deleteAccount(id : number) : Observable<Object> {
    const path = this.accountUrl + id;
    return this.http.delete(path, {observe: 'response'});
  }


  getDiscounts() : Observable<any> {
    return this.http.get(this.discountUrl + "list");
  }

  getDiscount(id : number) : Observable<any> {
    return this.http.get(this.discountUrl + id);
  }

  addDiscount(account : any) :Observable<Object> {
    const path = this.discountUrl;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const headers = { 'content-type': 'application/json'}
    return this.http.post(path, account, {'headers' : headers});
  }

  editDiscount(account : any, id : number) : Observable<Object> {
    account['id'] = id;
    const path = this.discountUrl + id;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const headers = { 'content-type': 'application/json'}
    return this.http.put(path, account, {'headers' : headers});
  }

  deleteDiscount(id : number) : Observable<Object> {
    const path = this.discountUrl + id;
    return this.http.delete(path, {observe: 'response'});
  }


}
