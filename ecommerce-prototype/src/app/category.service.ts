import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private geAllCategoriesUrl = "http://localhost:8080/categories/getCategory";///
  private deleteCategoryUrl = "http://localhost:8080/categories/deleteCategory/";//{id}
  private addCategoryUrl = "http://localhost:8080/categories/addCategory";//json category body
  private updateCategoryUrl = "http://localhost:8080/categories/updateCategory/";//{id}/{name}

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
