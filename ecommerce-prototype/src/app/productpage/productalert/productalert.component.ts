import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-productalert',
  templateUrl: './productalert.component.html',
  styleUrl: './productalert.component.css'
})
export class ProductalertComponent {


  constructor(public dialogRef: MatDialogRef<ProductalertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string){}

}
