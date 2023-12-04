import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';



const routes: Routes = [{path:"mainpage",component:TenantListComponent ,canActivate: [AuthGuard]},{path:"signup",component:SignupComponent},
{path:'login',component:LoginComponent},
{ path: '', redirectTo: '/signup', pathMatch: 'full' },
{path:'AttendanceReport', component:AttendanceReportComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
