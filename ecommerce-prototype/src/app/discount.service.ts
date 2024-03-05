import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }

  private checkUrl = "http://localhost:9001/discount/checkCode/";//{id}/{code}
  private useDiscountUrl = "http://localhost:9001/discount/useCode/";//{id}/{code}

  checkDiscount(accountId:number,discountCode:string){
    return this.http.get<any>(this.checkUrl+accountId+"/"+discountCode)
  }

  useDiscount(accountId:number,discountCode:string){
    //removes discount code
    return this.http.get<any>(this.useDiscountUrl+accountId+"/"+discountCode)
  }

}
