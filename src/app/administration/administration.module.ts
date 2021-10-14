import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { SharedModule } from '../shared/shared.module';
import { UserFilterPipe } from '../Pipes/user-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonalInfoPopupComponent } from '../personal-info-popup/personal-info-popup.component';
@NgModule({
  declarations: [
    EmployeeListComponent,
    AdminLayoutComponent,
    PersonalInfoPopupComponent,
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AdministrationModule {}
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
