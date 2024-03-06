import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }

  private baseUrl = environment.discount_url;

  private checkUrl = this.baseUrl + "discount/checkCode/";//{id}/{code}
  private useDiscountUrl = this.baseUrl + "discount/useCode/";//{id}/{code}

  checkDiscount(accountId:number,discountCode:string){
    return this.http.get<any>(this.checkUrl+accountId+"/"+discountCode)
  }

  useDiscount(accountId:number,discountCode:string){
    //removes discount code
    return this.http.get<any>(this.useDiscountUrl+accountId+"/"+discountCode)
  }

}
