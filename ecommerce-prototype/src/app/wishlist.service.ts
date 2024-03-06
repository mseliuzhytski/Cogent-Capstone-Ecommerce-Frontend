import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Product } from './dto/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private getWishlistUrl = "http://localhost:8080/wishlist/getlist"
  private deleteWishlistItemUrl= "http://localhost:8080/wishlist/removeitem"
  private postWishlistItemUrl="http://localhost:8080/wishlist/additem"

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

  deleteWishlistItem(item:Product){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.deleteWishlistItemUrl,item,{headers})
  }
}
