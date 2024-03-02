import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private geAllCategoriesUrl = "http://localhost:8080/categories/getCategory";

  constructor(private http:HttpClient) { }


  getAllCategories(){

    return this.http.get<any>(this.geAllCategoriesUrl)

  }

}
