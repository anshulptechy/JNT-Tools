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
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
{path:"mainpage",component:TenantListComponent},
{path:"signup",component:SignupComponent},
{path:'login',component:LoginComponent},
{ path: '', redirectTo: '/signup', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent},
{ path: 'update', component: UpdateButtonComponent },
{ path: 'create-project-dialog', component: CreateProjectDialogComponent },
{ path: 'confirmation-dialog', component: ConfirmationDialogComponent },
 {path:'projectReport',component:ProjectReportComponent,canActivate: [AuthGuard]},
 {path:'taskDashboard',component:TaskDashboardComponent,canActivate:[AuthGuard]},
{path:'userDetails',component:UserDetailsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }