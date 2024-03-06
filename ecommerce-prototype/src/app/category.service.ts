import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { env } from 'process';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.url;

  private geAllCategoriesUrl = this.baseUrl + "categories/getCategory";///
  private deleteCategoryUrl = this.baseUrl + "categories/deleteCategory/";//{id}
  private addCategoryUrl = this.baseUrl + "categories/addCategory";//json category body
  private updateCategoryUrl = this.baseUrl + "categories/updateCategory/";//{id}/{name}

  constructor(private http:HttpClient,private authService:AuthServiceService) { }


  getAllCategories(){
    return this.http.get<any>(this.geAllCategoriesUrl)
  }

  deleteCategory(id:number){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(this.deleteCategoryUrl+id,{headers})
  }

  addCategory(category){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.addCategoryUrl,category,{headers})
  }

  updateCategory(id:number,name:string){
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.updateCategoryUrl+id+'/'+name,null,{headers})
  }

}
