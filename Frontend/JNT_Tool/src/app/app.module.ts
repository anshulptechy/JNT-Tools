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
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';

@NgModule({
  declarations: [
    AppComponent,
    TenantListComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    AttendanceReportComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
