import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';

import { UserDetailsComponent } from './user-details/user-details.component';
 
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';

import { DashboardComponent } from './crudProjectComponents/dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './crudProjectComponents/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './crudProjectComponents/update-button/update-button.component';
import { MatButtonModule } from '@angular/material/button';
import{MatIconModule} from '@angular/material/icon';
import{MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'; 
import{MatCheckboxModule} from '@angular/material/checkbox'
import { DatePipe } from '@angular/common';
import{MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS,MatMomentDateModule} from '@angular/material-moment-adapter';

import { DialogRef } from '@angular/cdk/dialog';



import { ProjectReportComponent } from './project-report/project-report.component';

import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    CalendarComponent,
    TaskDashboardComponent,
    TaskDialogComponent,
    TaskUpdateComponent,
    UserDetailsComponent,
 
    HeaderComponent,DashboardComponent,ConfirmationDialogComponent,CreateProjectDialogComponent,UpdateButtonComponent,
    ProjectReportComponent,HeaderComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),CommonModule
    , MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule,
    DatePipe,
    MatSelectModule,
    MatSnackBarModule,
    MatMomentDateModule,FormsModule,MatButtonModule,
    MatIconModule, RouterModule,NgxUiLoaderModule,ReactiveFormsModule,FormsModule,CommonModule,
    
  ],
  providers: [DatePipe,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, /* optional */
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },],
  bootstrap: [AppComponent]
})
export class AppModule { }