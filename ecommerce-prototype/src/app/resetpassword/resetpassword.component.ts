import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from '../reset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{

  email:string
  token:string
  resetForm:FormGroup
  validPass = true;
  validConfirm = true;
  changed:boolean;
  errorMessage:string;
  dialogRef:any;

  constructor(private route:ActivatedRoute,private resetService:ResetService,
    private dialog : MatDialog, private router: Router){}

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

  onSubmit() {
    const password = this.resetForm.get('password').value;
    const confirm = this.resetForm.get('confirmpassword').value;
    if(this.validatePassword(password)){
      this.validPass= false
      this.resetForm.get('password').setErrors({"invalid":true})
      this.errorMessage = "Password requirements not met";
    }

    if(this.matchPassword(password,confirm)){
      this.validConfirm = false;
      this.resetForm.get('confirmpassword').setErrors({"invalid":true})
      this.errorMessage = "Passwords must match";
    }

    if(this.validConfirm && this.validPass){
      this.errorMessage = "";
      console.log("valid");
      this.resetService.updatePassword(password,this.token,this.email).subscribe(
        response =>{
          this.changed = response;
          if (this.changed) {
            let d = {
              'heading' : 'Successful',
              'message' : 'Password was successfully reset'
            };
            this.dialogRef = this.dialog.open(DialogComponent,
              {data: d});
            this.dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['/login']);
            });
          } else {
            this.errorMessage = "There was an error resetting the password";
          }
        },
        err => {
          this.errorMessage = "There was an error resetting the password";
        }
      );
    }
  }


}
