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

const routes: Routes = [{path:'userProfile', component:UserprofileComponent},
{path:'about', component:AboutComponent},
{path:'login', component:LoginComponent},
{path:'contact', component:ContactComponent},
{path:'home', component:HomepageComponent},
{path:'wishlist', component:WishlistComponent},
{path:'cart', component:CartComponent},
{path:'shopAll', component:ShopComponent},
{path:'signUp', component:SignupComponent},
{path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
