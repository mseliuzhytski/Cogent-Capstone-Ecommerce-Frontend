import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http:HttpClient) { }

  private resetRequestUrl = "http://localhost:8080/resetPass/";

  sendResetRequest(email:string){
    return this.http.get<any>(this.resetRequestUrl+email)
  }

  updatePassword(password:string,token:string,email:string){
    const pass = {
      "password":password
    }
    return this.http.put<any>(this.resetRequestUrl+token+"/"+email,pass);
  }

}
