import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{


  signUpForm:FormGroup

  ngOnInit(): void {
    this.signUpForm=new FormGroup(
      {
        username:new FormControl(null,Validators.required),
        password:new FormControl(null, Validators.required),
        confirmpassword:new FormControl(null, Validators.required),
        email:new FormControl(null, [Validators.required,Validators.email])
      });
  }

  constructor(private authservice:AuthServiceService,private router: Router){

  }

  validatePassword(password){

    if (password.length < 8) {
      return true;
    }
  
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasLowerCase || !hasUpperCase) {
      return true;
    }

    const hasNumber = /\d/.test(password);
    if (!hasNumber) {
      return true;
    }
  
    // Checksif password has one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
      return true;
    }
  }

  matchPassword(password,confirm){
    if (password !== confirm) {
      return true;
    }
  }

  validPass = true;
  validConfirm = true;

  onSubmit(){

    const username = this.signUpForm.get('username').value;
    const password = this.signUpForm.get('password').value;
    const confirm = this.signUpForm.get('confirmpassword').value;
    const email = this.signUpForm.get('email').value;

    if(this.validatePassword(password)){
      this.validPass= false
      this.signUpForm.get('password').setErrors({"invalid":true})
    }

    if(this.matchPassword(password,confirm)){
      this.validConfirm = false;
      this.signUpForm.get('confirmpassword').setErrors({"invalid":true})
    }

    if(this.validConfirm && this.validPass){


      const user ={
        "username":username,
        "password":password,
        "email":email
      }

      this.authservice.createUser(user).subscribe();
      this.router.navigate(['/login']);
    }

    console.log(username,password,email)

  }

}
