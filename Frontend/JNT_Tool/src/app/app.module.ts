import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { EditComponent } from './couponComponents/edit/edit.component';
import { CouponsComponent } from './couponComponents/coupons/coupons.component';
import { AddComponent } from './couponComponents/add/add.component';
import { SignupComponent } from './sign-up/sign-up.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './crudProjectComponents/dashboard/dashboard.component';
import { ConfirmationDialogComponent } from './crudProjectComponents/confirmation-dialog/confirmation-dialog.component';
import { CreateProjectDialogComponent } from './crudProjectComponents/create-project-dialog/create-project-dialog.component';
import { UpdateButtonComponent } from './crudProjectComponents/update-button/update-button.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { SalaryReportComponent } from './SalaryReport/salary-report/salary-report.component';
import { LeaveManagementComponent } from './lms component/leave-management/leave-management.component';
import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';

@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ConfirmationDialogComponent,
    CreateProjectDialogComponent,
    UpdateButtonComponent,
    ProjectReportComponent,
    LeaveManagementComponent,
    LeavestatusComponent,
    CouponsComponent,
    AddComponent,
    EditComponent,
    CalendarComponent,
    TaskDashboardComponent,
    TaskDialogComponent,
    TaskUpdateComponent,
    UserDetailsComponent,
    SalaryReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    CommonModule,
    MatCheckboxModule,
    MatMomentDateModule,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
