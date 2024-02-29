import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

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

}
