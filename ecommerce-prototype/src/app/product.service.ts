import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private getProductsUrl = environment.url + "products/getAllProducts";
  private getOneProductUrl = environment.url + "products/getProduct/";

  getAllProducts(){

    return this.http.get<any>(this.getProductsUrl)

  }

  getProduct(id){

    return this.http.get<any>(this.getOneProductUrl+id)

  }


}
