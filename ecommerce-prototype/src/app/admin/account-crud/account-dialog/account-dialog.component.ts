import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrl: './account-dialog.component.css'
})
export class AccountDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {

  }
  ngOnInit(): void {

  }

}
