import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { ProductCrudComponent } from './admin/product-crud/product-crud.component';
import { AccountCrudComponent } from './admin/account-crud/account-crud.component';
import { SalesReportComponent } from './admin/sales-report/sales-report.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductpageComponent } from './productpage/productpage.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbar} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductDialogComponent } from './admin/product-crud/product-dialog/product-dialog.component';
import { AccountDialogComponent } from './admin/account-crud/account-dialog/account-dialog.component';
import { AccountTableComponent } from './admin/account-crud/account-table/account-table.component';
import { AccountFormComponent } from './admin/account-crud/account-form/account-form.component';
import { DiscountTableComponent } from './admin/account-crud/discount-table/discount-table.component';
import { DiscountFormComponent } from './admin/account-crud/discount-form/discount-form.component'
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { AccountTableDialogComponent } from './admin/account-crud/account-table/account-table-dialog/account-table-dialog.component';
import { DiscountTableDialogComponent } from './admin/account-crud/discount-form/discount-table-dialog/discount-table-dialog.component';
import { SalesItemTableComponent } from './admin/sales-report/sales-item-table/sales-item-table.component';
import { SalesUserTableComponent } from './admin/sales-report/sales-user-table/sales-user-table.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    HomepageComponent,
    AboutComponent,
    ContactComponent,
    WishlistComponent,
    CartComponent,
    ShopComponent,
    SearchbarComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    ProductCrudComponent,
    AccountCrudComponent,
    SalesReportComponent,
    ProductDialogComponent,
    AccountDialogComponent,
    AccountTableComponent,
    AccountFormComponent,
    DiscountTableComponent,
    DiscountFormComponent,
    // ReactiveFormsModule,
    // FormsModule,
    ProductpageComponent,
    HomeComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AccountTableDialogComponent,
    DiscountTableDialogComponent,
    SalesItemTableComponent,
    SalesUserTableComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    // NgxPaginationModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbar,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
