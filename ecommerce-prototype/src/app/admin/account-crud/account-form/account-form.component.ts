import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { AccountCrudService } from '../../../account-crud.service';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';
import { AuthServiceService } from '../../../auth-service.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {

  addForm : FormGroup;

  showIsEdit : boolean = false;

  availableDiscounts : any;

  accountId : number = null;
  accountUsername : string = null;

  dialogRef : any;

  @Output()
  eventEmitter = new EventEmitter<any>();

  constructor(private accountService : AccountCrudService, public dialog : MatDialog,
      private authService : AuthServiceService) {
  }

  createAccountObject() {
    let acc = {};
    if (this.showIsEdit) {

    } else {
      acc['username'] = this.addForm.get('username').value;
      acc['password'] = this.addForm.get('password').value;
      acc['email'] = this.addForm.get('email').value;
      acc['discount'] = this.addForm.get('discount').value;
      acc['user'] = true;
      acc['admin'] = false;
    }
    return acc;
  }

  createCustomUser(account) {
    let user = {};
    user['username'] = account['username'];
    user['password'] = account['password'];
    user['email'] = account['email'];
    return user;
  }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, isValidPassword()]),
      confirmPassword: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      discount: new FormControl(null),
      user: new FormControl(null),
      admin: new FormControl(null),
    }, {
      validators: passwordMatchValidator
    });
    this.initializeForm();
  }

  initializeForm() : void {
    this.accountService.getDiscounts().subscribe(discounts => {
      this.availableDiscounts = discounts;
    });
  }

  public clearView() {
    this.addForm.get('username').setValue(null);
    this.addForm.get('password').setValue(null);
    this.addForm.get('confirmPassword').setValue(null);
    this.addForm.get('email').setValue(null);
    this.addForm.get('discount').setValue(null);
    this.addForm.markAsPristine();
    this.addForm.markAsUntouched();
    this.addForm.reset();
  }

  addItem(event : Event) : void {
    event.preventDefault();
    if (!this.addForm.invalid) {
      let username = this.addForm.get('username').value;
      this.accountService.getAccountByUsername(username).subscribe(
        (data) => {
          this.dialogRef = this.dialog.open(AccountDialogComponent,
            {data: {type: 'add_account_username_duplicate'}});
        }, (err) => {
          this.addItem2();
        }, () => {}
      )
    } else {
      this.dialogRef = this.dialog.open(AccountDialogComponent,
        {data: {type: 'add_account_error'}});
    }
  }

  addItem2() : void {
    let discount = this.addForm.get('discount').value;
    if (!(discount == null || discount == "")) {
      this.accountService.getDiscountByCode(discount).subscribe(
        (data) => {
          this.addItem3(data);
        }, (err) => {
          this.dialogRef = this.dialog.open(AccountDialogComponent,
            {data : {type : 'add_account_discount_error'}});
        }
      )
    } else {
      this.addItem3(null);
    }
  }

  addItem3(discount) : void {
    let email = this.addForm.get('email').value;
    this.accountService.getAccountByEmail(email).subscribe(
      (data) => {
        this.dialogRef = this.dialog.open(AccountDialogComponent,
        {data : {type : 'add_account_email_duplicate'}});
      },
      (err) => {
        this.addItemSuccess(discount);
      }
    )
  }

  addItemSuccess(discount) : void {
    let acc = this.createAccountObject();
    let user = this.createCustomUser(acc);
    let username = acc['username'];
    this.authService.createUser(user).subscribe(
      (data) => {
        if (discount != null) {
          this.accountService.getAccountByUsername(username).subscribe(newAcc => {
            let id = newAcc['id'];
            newAcc['discount'] = discount;
            console.log("id " + id);
            this.accountService.editAccount(newAcc, id).subscribe(
              (data) => {
                this.dialogRef = this.dialog.open(AccountDialogComponent,
                  {data: {type: 'add_account_success'}});
                this.dialogRef.afterClosed().subscribe(result => {
                  if (result == 'add') {
                    this.eventEmitter.emit('add');
                  } else if (result == 'view') {
                    this.eventEmitter.emit('view');
                  }
                });
              }, (err) => {
                console.log("error editing an account:");
                console.log(acc);
                this.dialogRef = this.dialog.open(AccountDialogComponent,
                  {data: {type: 'add_account_unknown_error'}});
              }
            )
          });
        } else {
          this.dialogRef = this.dialog.open(AccountDialogComponent,
            {data: {type: 'add_account_success'}});
          this.dialogRef.afterClosed().subscribe(result => {
            if (result == 'add') {
              this.eventEmitter.emit('add');
            } else if (result == 'view') {
              this.eventEmitter.emit('view');
            }
          });
        }
      },
      (err) => {
          console.log("error creating a custom user");
          console.log(acc);
          this.dialogRef = this.dialog.open(AccountDialogComponent,
            {data: {type: 'add_account_unknown_error'}});
      });
  }

}

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;
  return (password != confirmPassword) ? {passwordMatch : true} : null;
};

export function isValidPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.value;
    let invalid = validatePassword(password);
    return invalid ? { isValidPassword: true } : null;
  };
}

export function validatePassword(password){
  if (password == null) {
    return true;
  }
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
