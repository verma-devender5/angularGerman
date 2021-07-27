import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Public/login/login.component';

import { HomeComponent } from './Public/home/home.component';
import { ProfileComponent } from './Protected/profile/profile.component';
import { BoardAdminComponent } from './Admin/board-admin/board-admin.component';
import { BoardModeratorComponent } from './Admin/board-moderator/board-moderator.component';
import { BoardUserComponent } from './Admin/board-user/board-user.component';
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
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AdminComponent } from './admin.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { AuthInterceptor } from './Helpers/auth.interceptor';
import { AuthService } from './Service/Auth/auth.service';
import { CustomerService } from './createcustomer/customer.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeDataComponent } from './view-employee-data/view-employee-data.component';
import { ViewCustomerDetailComponent } from './view-customer-detail/view-customer-detail.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { UserFilterPipe } from './Pipes/user-filter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonalInfoPopupComponent } from './personal-info-popup/personal-info-popup.component';
import { RegisterComponent } from './Public/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    CreatecustomerComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    SidebarComponent,
    PersonalInfoComponent,
    ViewCustomerComponent,
    AdminComponent,
    NotfoundComponent,
    EmployeeListComponent,
    ViewEmployeeDataComponent,
    ViewCustomerDetailComponent,
    CreateEmployeeComponent,
    UserFilterPipe,
    PersonalInfoPopupComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
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
