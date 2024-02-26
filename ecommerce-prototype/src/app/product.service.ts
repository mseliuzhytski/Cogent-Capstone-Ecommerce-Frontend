import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private getProductsUrl = "http://localhost:8080/products/getAllProducts";
  private getOneProductUrl = "http://localhost:8080/products/getProduct/";

  getAllProducts(){

    return this.http.get<any>(this.getProductsUrl)

  }

  getProduct(id){

    return this.http.get<any>(this.getOneProductUrl+id)

  }


}
