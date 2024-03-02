import { Component } from '@angular/core';
import { ResetService } from '../reset.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  constructor(private resetService:ResetService){}

  value = ""
  emailSent = false;


  submitResetRequest(){
    this.resetService.sendResetRequest(this.value).subscribe(
      response=>{
        this.emailSent=response;
      }
    );
  }

}
