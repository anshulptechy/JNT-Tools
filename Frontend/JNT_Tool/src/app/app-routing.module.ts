import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectReportComponent } from './project-report/project-report.component';



const routes: Routes = [{path:"mainpage",component:TenantListComponent ,canActivate: [AuthGuard]},{path:"signup",component:SignupComponent},{path:'login',component:LoginComponent},{ path: '', redirectTo: '/signup', pathMatch: 'full' },{path:'projectReport',component:ProjectReportComponent,canActivate: [AuthGuard]}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
