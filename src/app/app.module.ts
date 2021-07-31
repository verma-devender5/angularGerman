import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Public/login/login.component';
import { HomeComponent } from './Public/home/home.component';
import { ProfileComponent } from './Protected/profile/profile.component';

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';

import { NavigationComponent } from './navigation/navigation.component';

import { PersonalInfoComponent } from './personal-info/personal-info.component';

import { AdminComponent } from './admin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthInterceptor } from './Helpers/auth.interceptor';
import { AuthService } from './Service/Auth/auth.service';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeDataComponent } from './view-employee-data/view-employee-data.component';
import { ViewCustomerDetailComponent } from './view-customer-detail/view-customer-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

import { UserFilterPipe } from './Pipes/user-filter.pipe';

import { RegisterComponent } from './Public/register/register.component';
import { AuthMainService } from './Service/AuthService/auth-main.service';

import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    CreatecustomerComponent,
    NavigationComponent,
    PersonalInfoComponent,
    AdminComponent,
    NotfoundComponent,
    EmployeeListComponent,
    ViewEmployeeDataComponent,
    ViewCustomerDetailComponent,
    CreateEmployeeComponent,
    UserFilterPipe,
    
    RegisterComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 9000,
      positionClass: 'toast-top-full-width',
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],

  providers: [
    AuthService,
    AuthMainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
