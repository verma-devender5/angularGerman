import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateCustomerComponent } from './create-customer/create-customer.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyProfileComponent } from './my-profile/my-profile.component';

import { EmployeeLayoutComponent } from './employee-layout/employee-layout.component';

import { SharedModule } from '../shared/shared.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserModule } from '@angular/platform-browser';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  declarations: [
    CreateCustomerComponent,
    MyProfileComponent,
    ViewCustomersComponent,
    EmployeeLayoutComponent,
  ],

  imports: [
    CommonModule,
    ClickOutsideModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeeRoutingModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class EmployeeModule {}
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
