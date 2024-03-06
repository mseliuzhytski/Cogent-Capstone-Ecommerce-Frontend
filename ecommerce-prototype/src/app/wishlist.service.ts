import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Product } from './dto/product';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  private baseUrl = environment.url;

  private getWishlistUrl = this.baseUrl + "wishlist/getlist"
  private deleteWishlistItemUrl= this.baseUrl + "wishlist/removeitem/"
  private postWishlistItemUrl= this.baseUrl + "wishlist/additem"
  private addToWishlistItemUrl=this.baseUrl + "wishlist/add/"//{productid}

  constructor(private http:HttpClient,private authService:AuthServiceService) { }

  getWishlist(){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.getWishlistUrl,{ headers })
  }

  addWishlistItem(item:Product){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.postWishlistItemUrl,item,{headers})
  }

  addToWishlist(id:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.addToWishlistItemUrl+id,null,{headers})
  }

  deleteWishlistItem(item:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(this.deleteWishlistItemUrl+item,{headers})
  }
}
