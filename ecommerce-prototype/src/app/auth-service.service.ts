import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  
  private authUrl = "http://localhost:8080/auth";
  private checkTokenUrl = "http://localhost:8080/checkToken";
  
  private signUpUrl = "http://localhost:8080/signUp";



  constructor(private http:HttpClient,private router: Router) { }

  createUser(user){
    return this.http.post<any>(this.signUpUrl, user);
  }


  login(username: string, password: string) {

    const authorizationHeader = 'Basic ' + btoa(username + ':' + password);
    const headers = new HttpHeaders().set('Authorization', authorizationHeader);
    return this.http.post<any>(this.authUrl, null, {headers});
    
  }

  

  saveToken(token:string){
    localStorage.setItem('Bearer Token',token)
  }

  getToken(){
    return localStorage.getItem('Bearer Token');
  }

  removeToken(){
    localStorage.removeItem('Bearer Token');
  }

  isTokenExpired(token){
//`Bearer ${token}`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<boolean>(this.checkTokenUrl, { headers })
    .pipe(
      catchError(error => {
        console.error('Error checking token:', error);
        throw error;
      })
    );
  }


  isLoggedIn():Observable<boolean> {

    if(!this.checkStorage()){
      this.router.navigate(['/login']);
      return of(false);
    }
    const token = this.getToken();

    if(!token){
      return of(false);
    }

    return this.isTokenExpired(token).pipe(
      map(expired => !expired),
      catchError(error => {
        console.error('Error checking token:', error);
        return of(false); // Treat errors as invalid
      })
    )

  }

  checkStorage():boolean{

    if (typeof window === 'undefined' || !window.localStorage) {
      console.error('localStorage is not available. Nothing has been saved or created into the storage so it starts of as undefined');
      return false; //so there is no token or anything saved
    }else{
      return true;
    }
  }
}