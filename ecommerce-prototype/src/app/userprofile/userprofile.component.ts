import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit{


  constructor(private authService: AuthServiceService, private router: Router) {
    
  }
  ngOnInit(): void {
    
    this.authService.isLoggedIn()
    .subscribe(isLoggedIn => {
      console.log(isLoggedIn);
      if(!isLoggedIn){
        this.router.navigate(['/login']);
      }
    });
  }


  logout(){
    this.authService.removeToken();
    this.router.navigate(['/login']);

  }

}
