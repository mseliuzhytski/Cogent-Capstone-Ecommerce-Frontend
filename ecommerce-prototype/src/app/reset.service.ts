import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http:HttpClient) { }

  private resetRequestUrl = environment.url + "resetPass/";

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
