import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http:HttpClient,private authService:AuthServiceService) { }

  private getCartUrl = "http://localhost:8080/cart/getCart";
  private addToCartUrl = "http://localhost:8080/cart/addToCart/";// http://localhost:8080/cart/addToCart/{pid}/{quantity}
  private updateCartUrl = "http://localhost:8080/cart/updateCart/";//http://localhost:8080/cart/updateCart/{pid}/{quantity}
  private deleteItemInCartUrl = "http://localhost:8080/cart/deleteItem/";
  private createSaleUrl = "http://localhost:8080/sale/makeSale";
  private getUserSales = "http://localhost:8080/sale/getSalesOfUser";


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
