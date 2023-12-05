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




const routes: Routes = [{path:"mainpage",component:TenantListComponent},{path:"signup",component:SignupComponent},{path:'login',component:LoginComponent},{ path: '', redirectTo: '/signup', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent},
{ path: 'update', component: UpdateButtonComponent }
  , { path: 'create-project-dialog', component: CreateProjectDialogComponent },
{ path: 'confirmation-dialog', component: ConfirmationDialogComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
