import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AdminComponent } from './admin.component';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileComponent } from './Protected/profile/profile.component';
import { LoginComponent } from './Public/login/login.component';
import { RegisterComponent } from './Public/register/register.component';
import { ViewCustomerDetailComponent } from './view-customer-detail/view-customer-detail.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewEmployeeDataComponent } from './view-employee-data/view-employee-data.component';

const routes: Routes = [
  // This component defines the shared main content around a router outlet.
  {
    path: '',
    component: AppComponent,
    children: [
      // This component is a main page
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  // This component defines the shared admin content around a router outlet.
  {
    path: 'user',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: CreatecustomerComponent,
        data: { roles: ['user'] },
      },
      // This component is an admin page
      {
        path: 'createcustomer',
        component: CreatecustomerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'personalinfo',
        component: PersonalInfoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] },
      },
      {
        path: 'customers',
        component: ViewCustomerComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user'] },
      },
      { path: '**', component: NotfoundComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,

    children: [
      {
        path: '',
        component: CreateEmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      // This component is an admin page
      {
        path: 'createemployee',
        component: CreateEmployeeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'employeedetail',
        component: ViewEmployeeDataComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      {
        path: 'customer/:id',
        component: ViewCustomerDetailComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
      { path: '**', component: NotfoundComponent },
    ],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
