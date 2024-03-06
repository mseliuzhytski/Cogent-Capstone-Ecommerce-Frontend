import { Component, OnInit } from '@angular/core';
import { ResetService } from '../reset.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit {

  emailSent = false;
  form: FormGroup;
  errorMessage = "";
  dialogRef : any;

  constructor(private resetService:ResetService, private dialog : MatDialog, private router: Router){}

  ngOnInit(): void {
    this.form=new FormGroup(
      {
        email:new FormControl(null,[Validators.required, Validators.email]),
      });
  }

  onSubmit() {
    this.resetService.sendResetRequest(this.form.get('email').value).subscribe(
      response=>{
        this.emailSent=response;
        console.log("successful email password reset: " + this.emailSent);
        if (this.emailSent) {
          let d = {
            'heading' : 'Successful',
            'message' : 'Password reset email sent'
          };
          this.dialogRef = this.dialog.open(DialogComponent,
            {data: d});
          this.dialogRef.afterClosed().subscribe(result => {
            this.router.navigate(['/login']);
          });
        } else {
          this.errorMessage = "Could not send email";
        }
      },
      error => {
        console.log("error with request");
      }
    );
  }

}
