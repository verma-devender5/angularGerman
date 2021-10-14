import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from './administration/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { EmployeeLayoutComponent } from './employee/employee-layout/employee-layout.component';

import { LoginComponent } from './Public/login/login.component';
import { RegisterComponent } from './Public/register/register.component';

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
