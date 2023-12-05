import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './crudProjectComponents/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './crudProjectComponents/update-button/update-button.component';
import { DashboardComponent } from './crudProjectComponents/dashboard/dashboard.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { ApplyLeaveComponent } from './lms component/apply-leave/apply-leave.component';
import { LeaveManagementComponent } from './lms component/leave-management/leave-management.component';
import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';




const routes: Routes = [{path:"mainpage",component:TenantListComponent},{path:"signup",component:SignupComponent},{path:'login',component:LoginComponent},{ path: '', redirectTo: '/signup', pathMatch: 'full'  },
{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
{ path: 'update', component: UpdateButtonComponent,canActivate: [AuthGuard] }
  , { path: 'create-project-dialog', component: CreateProjectDialogComponent ,canActivate: [AuthGuard]},
{ path: 'confirmation-dialog', component: ConfirmationDialogComponent ,canActivate: [AuthGuard]},{path:'projectReport',component:ProjectReportComponent,canActivate: [AuthGuard]},{path:'applyLeave',component:ApplyLeaveComponent,canActivate: [AuthGuard]},{path:'leaveManagement',component:LeaveManagementComponent,canActivate: [AuthGuard]},{path:'leaveStatus',component:LeavestatusComponent,canActivate: [AuthGuard]}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
