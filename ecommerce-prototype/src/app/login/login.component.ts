import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  

  signUpForm:FormGroup
  
  ngOnInit(): void {
    this.signUpForm=new FormGroup(
      {
        username:new FormControl(null,Validators.required),
        password:new FormControl(null)
      });
  }

  constructor(private authservice:AuthServiceService,private router: Router){

  }

  array:any

  onSubmit(){
    const username = this.signUpForm.get('username').value;
    const password = this.signUpForm.get('password').value;
    console.log(username,password)
    
    const response = this.authservice.login(username,password).subscribe((response) => {
      const token = response.token; 
      // Store or use the token here
      console.log('Extracted token:', token);
      this.authservice.saveToken(token);
    },
    (error) => {
      console.error('Login error:', error);
    });
    console.log(response)
    console.log(this.array)

    setTimeout(()=>{
      this.router.navigate(['/userProfile']);
    },2000)
    
  }

  goToSignUp(){
    this.router.navigate(['/signUp']);
  }

}
