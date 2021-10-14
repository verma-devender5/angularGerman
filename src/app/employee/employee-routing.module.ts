import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'createcustomer', component: CreateCustomerComponent },
      { path: 'viewcustomer', component: ViewCustomersComponent },
      { path: 'myprofile', component: MyProfileComponent },
      { path: '', redirectTo: 'employee', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
