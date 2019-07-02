import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyComponent } from './components/companies/company/company.component';
import { EmployeeComponent } from './components/employees/employee/employee.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    CompanyComponent,
    EmployeeComponent,
    EmployeesComponent,
    CompaniesComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard],
  bootstrap: [AppComponent]

})
export class AppModule { }
