import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http:HttpClient,private authService:AuthServiceService) { }

  private baseUrl = environment.url;

  private getCartUrl = this.baseUrl + "cart/getCart";
  private addToCartUrl = this.baseUrl + "cart/addToCart/";// http://localhost:8080/cart/addToCart/{pid}/{quantity}
  private updateCartUrl = this.baseUrl + "cart/updateCart/";//http://localhost:8080/cart/updateCart/{pid}/{quantity}
  private deleteItemInCartUrl = this.baseUrl + "cart/deleteItem/";
  private createSaleUrl = this.baseUrl + "sale/makeSale";
  private getUserSales = this.baseUrl + "sale/getSalesOfUser";


  addToCart(productId:number,quantity:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.addToCartUrl+productId+"/"+quantity,null,{headers});
  }

  updateCart(productId:number,quantity:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.updateCartUrl+productId+"/"+quantity,null,{headers});
  }

  getCart(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getCartUrl,{ headers });

  }

  removeFromCart(productId:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(this.deleteItemInCartUrl+productId,{headers});

  }

  createSale(allItems){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.createSaleUrl,allItems,{headers});
  }

  getUserOrders(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getUserSales,{headers});
  }

}
