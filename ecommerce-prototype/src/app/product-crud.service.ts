import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  private url = "http://localhost:8080/";

  private products = [];

  constructor(private http : HttpClient) { }

  getProducts() : Observable<Object> {
    return this.http.get(this.url + "product/list");
  }

  uploadImage(file : File) : Observable<Object> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.url + "upload-image", formData);
  }

  addProduct(product : any) :Observable<Object> {
    const path = this.url + "product";
    // console.log("path: " + path);
    const params = new HttpParams(product);
    const productJson = JSON.stringify(product);
    const headers = { 'content-type': 'application/json'}
    return this.http.post(path, product, {'headers' : headers});
  }

}
