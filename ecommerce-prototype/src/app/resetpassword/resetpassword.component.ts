import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResetService } from '../reset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{


  constructor(private route:ActivatedRoute,private resetService:ResetService){}

  email:string
  token:string
  resetForm:FormGroup

  ngOnInit() {
    const combinedToken = this.route.snapshot.paramMap.get('resetToken')

    if(combinedToken){
      const split = combinedToken.split(':');
      this.token = split[0]
      this.email = split[1]
    }

    this.resetForm=new FormGroup({
      password:new FormControl(null, Validators.required),
      confirmpassword:new FormControl(null, Validators.required),
    })

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
  changed:boolean;

  submitPassword(){

    const password = this.resetForm.get('password').value;
    const confirm = this.resetForm.get('confirmpassword').value;
    if(this.validatePassword(password)){
      this.validPass= false
      this.resetForm.get('password').setErrors({"invalid":true})
    }

    if(this.matchPassword(password,confirm)){
      this.validConfirm = false;
      this.resetForm.get('confirmpassword').setErrors({"invalid":true})
    }

    if(this.validConfirm && this.validPass){
      this.resetService.updatePassword(password,this.token,this.email).subscribe(
        response =>{
          this.changed = response;
        }
      );
    }
  }


}
