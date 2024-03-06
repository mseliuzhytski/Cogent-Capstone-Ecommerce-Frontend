import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountCrudService {

  private url = environment.url;
  private accountUrl = this.url + "account/";
  private discountUrl = this.url + "discount/";

  private products = [];

  constructor(private http : HttpClient,private authService:AuthServiceService) { }

  getAccounts() : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.accountUrl + "list",{headers});
  }

  getAccount(id : number) : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.accountUrl + id,{headers});
  }

  getAccountByUsername(username : string) : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.url + "accountByName/" + username,{headers});
  }

  getAccountByEmail(email : string) : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.url + "accountByEmail/" + email,{headers});
  }

  addAccount(account : any) :Observable<Object> {
    const path = this.accountUrl;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(path, account, {headers});
  }

  editAccount(account : any, id : number) : Observable<Object> {
    account['id'] = id;
    const path = this.accountUrl + id;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(path, account, {headers});
  }

  deleteAccount(id : number) : Observable<Object> {
    const path = this.accountUrl + id;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(path, {observe: 'response',headers:headers});
  }


  getDiscounts() : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.discountUrl + "list",{headers});
  }

  getDiscount(id : number) : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.discountUrl + id,{headers});
  }

  addDiscount(account : any) :Observable<Object> {
    const path = this.discountUrl;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(path, account, {headers});
  }

  editDiscount(account : any, id : number) : Observable<Object> {
    account['id'] = id;
    const path = this.discountUrl + id;
    const params = new HttpParams(account);
    const productJson = JSON.stringify(account);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(path, account,{headers});
  }

  deleteDiscount(id : number) : Observable<Object> {
    const path = this.discountUrl + id;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(path, {observe: 'response',headers:headers});
  }

  getDiscountByCode(code : string) : Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.discountUrl + "getByCode/" + code,{headers});
  }

}
