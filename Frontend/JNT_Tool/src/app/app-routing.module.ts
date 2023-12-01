import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddCouponComponent } from './couponComponents/add-coupon/add-coupon.component';
import { UpdateComponent } from './couponComponents/update/update.component';
import { CouponsComponent } from './couponComponents/coupons/coupons.component';




const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' }, 
  {path:"mainpage",component:TenantListComponent ,canActivate: [AuthGuard]},
  {path:"signup",component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'addCoupon',component:AddCouponComponent},
  {path:'update',component:UpdateComponent},
  {path:'Coupons',component:CouponsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
