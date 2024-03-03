import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountCrudService } from '../../../account-crud.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscountTableDialogComponent } from './discount-table-dialog/discount-table-dialog.component';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrl: './discount-form.component.css'
})
export class DiscountFormComponent {

  addForm : FormGroup;

  showIsEdit : boolean = false;

  discountId : number = null;
  discountCode : string = null;

  dialogRef : any;

  @Output()
  eventEmitter = new EventEmitter<any>();

  ngOnInit(): void {
    this.addForm = new FormGroup({
      discountCode: new FormControl(null, Validators.required),
      discountPercent : new FormControl(null, [Validators.required,isValidNumber()])
    });
  }

  constructor(private accountService : AccountCrudService, public dialog : MatDialog) {
  }

  createDiscountObject() {
    let discount = {};
    if (this.showIsEdit) {

    } else {
      discount['discountCode'] = this.addForm.get('discountCode').value;
      discount['discountPercent'] = this.addForm.get('discountPercent').value;
    }
    return discount;
  }

  public clearView() {
    this.addForm.get('discountCode').setValue(null);
    this.addForm.get('discountPercent').setValue(null);
    this.addForm.markAsPristine();
    this.addForm.markAsUntouched();
    this.addForm.reset();
  }

  addItem(event : Event) {
    event.preventDefault();
    if (!this.addForm.invalid) {
      this.accountService.getDiscountByCode(this.addForm.get('discountCode').value).subscribe(
        (acc) => {
          this.dialogRef = this.dialog.open(DiscountTableDialogComponent,
            {data : {type : 'add_discount_duplicate'}});
        },
        (err) => {
          this.accountService.addDiscount(this.createDiscountObject()).subscribe(
            (acc2) => {
              this.dialogRef = this.dialog.open(DiscountTableDialogComponent,
                {data : {type : 'add_discount_success'}});
                this.dialogRef.afterClosed().subscribe(result => {
                  if (result == 'add') {
                    this.eventEmitter.emit('add');
                  } else if (result == 'view') {
                    this.eventEmitter.emit('view');
                  }
                });
            },
            (err) => {
              console.log("error creating discount");
              console.log(err);
            },
            () => {}
          );
        },
        () => {
        }
      );
    } else {
      this.dialogRef = this.dialog.open(DiscountTableDialogComponent,
        {data: {type: 'add_discount_failure'}});
    }
  }

}

export function isValidNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    let valid = true;
    let x = Number(value);
    if (isNaN(x)) {
      valid = false;
    }
    if (!Number.isInteger(x)) {
      valid = false;
    }
    if (x < 0 || x > 100) {
      valid = false;
    }
    return !valid ? { isValidNumber: true } : null;
  };
}
