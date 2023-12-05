import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
// import { LoginuserComponent } from './loginuser/loginuser.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProjectReportComponent } from './project-report/project-report.component';
import { FormsModule } from '@angular/forms';
import { LeaveManagementComponent } from './lms component/leave-management/leave-management.component';
import { ApplyLeaveComponent } from './lms component/apply-leave/apply-leave.component';
import { LeavestatusComponent } from './lms component/leavestatus/leavestatus.component';
@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    ProjectReportComponent,LeaveManagementComponent,ApplyLeaveComponent,LeavestatusComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),CommonModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
