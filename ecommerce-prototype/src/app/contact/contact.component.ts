import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private authService:AuthServiceService,private dialog: MatDialog){}

  contactForm:FormGroup

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      message: new FormControl(null, Validators.required),
      issueType: new FormControl(null, Validators.required)
    })
  }

  buttonExpandA=true
  expandA():void{
    if(this.buttonExpandA){
      document.getElementById("fmA").className = "fm_body_h"
      document.getElementById("buttonExpandA").innerText = "EXPAND"
      this.buttonExpandA = false
    } else{
      document.getElementById("fmA").className = "fm_body"
      document.getElementById("buttonExpandA").innerText = "HIDE"
      this.buttonExpandA = true
    }
  }

  onSubmit(){

    const email = this.contactForm.get('email').value;
    const name = this.contactForm.get('name').value;
    const message = this.contactForm.get('message').value;
    const issueType = this.contactForm.get('issueType').value;
    const contactJsonObject = {"name":name,"email":email,"message":message,"issueType":issueType}
    this.authService.sendContactUsEmail(contactJsonObject).subscribe(
      response=>{
        console.log(response)
        if(response){
          this.openMessageDialog()
        }
      }
    )
  }

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px'
    });
  }

}
