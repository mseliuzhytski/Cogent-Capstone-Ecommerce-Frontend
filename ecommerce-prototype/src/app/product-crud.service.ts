import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCrudService {

  private url = "http://localhost:8080/";

  private products = [];

  constructor(private http : HttpClient,private authService:AuthServiceService) { }

  getProducts() : Observable<Object> {
    return this.http.get(this.url + "product/list");
  }

  uploadImage(file : File) : Observable<Object> {
    const formData = new FormData();
    formData.append("file", file);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url + "upload-image", formData,{headers});
  }
  

  addProduct(product : any) :Observable<Object> {
    const path = this.url + "product";
    // console.log("path: " + path);
    const params = new HttpParams(product);
    const productJson = JSON.stringify(product);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(path, product, {headers});
  }

  editProduct(product : any, id : number) : Observable<Object> {
    product['id'] = id;
    const path = this.url + "product/" + id;
    const params = new HttpParams(product);
    const productJson = JSON.stringify(product);
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(path, product, {headers});
  }

  getProduct(id : number) : Observable<Object> {
    const path = this.url + "product/" + id;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(path,{headers});
  }

  deleteProduct(id : number) : Observable<Object> {
    const path = this.url + "product/" + id;
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(path, {observe: 'response',headers});
  }

  uploadCsv(file : File) : Observable<Object> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(this.url + "bulk-upload", formData);
  }

}
