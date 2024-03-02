import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {

  addForm : FormGroup;

  showIsEdit : boolean = false;

  ngOnInit(): void {
    this.addForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      discount: new FormControl(null),
      user: new FormControl(null),
      admin: new FormControl(null),
    });
  }

}
