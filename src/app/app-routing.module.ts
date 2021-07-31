import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from './administration/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreatecustomerComponent } from './createcustomer/createcustomer.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeLayoutComponent } from './employee/employee-layout/employee-layout.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfileComponent } from './Protected/profile/profile.component';
import { LoginComponent } from './Public/login/login.component';
import { RegisterComponent } from './Public/register/register.component';
import { ViewCustomerDetailComponent } from './view-customer-detail/view-customer-detail.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewEmployeeDataComponent } from './view-employee-data/view-employee-data.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },

  {
    path: 'employee',
    component: EmployeeLayoutComponent,
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: '',
    redirectTo: 'login',

    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
