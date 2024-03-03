import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-discount-table-dialog',
  templateUrl: './discount-table-dialog.component.html',
  styleUrl: './discount-table-dialog.component.css'
})
export class DiscountTableDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) {

  }
  ngOnInit(): void {

  }

}
