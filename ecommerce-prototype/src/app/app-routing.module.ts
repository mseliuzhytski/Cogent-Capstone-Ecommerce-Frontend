import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AccountCrudComponent } from './admin/account-crud/account-crud.component';
import { ProductCrudComponent } from './admin/product-crud/product-crud.component';
import { SalesReportComponent } from './admin/sales-report/sales-report.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path:'userProfile', component:UserprofileComponent},
{path:'about', component:AboutComponent},
{path:'login', component:LoginComponent},
{path:'contact', component:ContactComponent},
{path:'home', component:HomeComponent},
{path:'wishlist', component:WishlistComponent},
{path:'cart', component:CartComponent},
{path:'shopAll', component:ShopComponent},
{path:'signUp', component:SignupComponent},
{path:'admin', component:AdminComponent},
{path:'admin/product', component:ProductCrudComponent},
{path:'admin/account', component:AccountCrudComponent},
{path:'admin/sales', component:SalesReportComponent},
{path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
