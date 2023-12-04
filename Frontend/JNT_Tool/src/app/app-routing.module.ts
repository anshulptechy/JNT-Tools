import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { CouponsComponent } from './couponComponents/coupons/coupons.component';
import { AddComponent } from './couponComponents/add/add.component';
import { EditComponent } from './couponComponents/edit/edit.component';



const routes: Routes = [
  {path:"mainpage",component:TenantListComponent,canActivate: [AuthGuard]},
  {path:"signup",component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'coupons',component:CouponsComponent},
  {path:'add',component:AddComponent},
  {path:'edit',component:EditComponent},
  { path: '', redirectTo: '/signup', pathMatch: 'full' }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
