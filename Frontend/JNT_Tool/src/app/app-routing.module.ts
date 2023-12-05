import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ApplyLeaveComponent } from './lms component/apply-leave/apply-leave.component';
import { LeaveManagementComponent } from './lms component/leave-management/leave-management.component';
import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';



const routes: Routes = [{path:"mainpage",component:TenantListComponent ,canActivate: [AuthGuard]},{path:"signup",component:SignupComponent},{path:'login',component:LoginComponent},{ path: '', redirectTo: '/signup', pathMatch: 'full' },{path:'projectReport',component:ProjectReportComponent,canActivate: [AuthGuard]},{path:'applyLeave',component:ApplyLeaveComponent,canActivate: [AuthGuard]},{path:'leaveManagement',component:LeaveManagementComponent,canActivate: [AuthGuard]},{path:'leaveStatus',component:LeavestatusComponent,canActivate: [AuthGuard]}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
