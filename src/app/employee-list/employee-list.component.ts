import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/Auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonalInfoPopupComponent } from '../personal-info-popup/personal-info-popup.component';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  isLoading: boolean = false;
  isLoadingCustomer: boolean = false;
  userList: any;
  customerList: any;
  userCount: boolean = false;
  searchText: string = '';
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public afAuth: AngularFireAuth
  ) {}
  name: any = 'got name';

  food: any;
  ngOnInit(): void {
    this.getUser();
  }
  openModal() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
      }
    });

    const dialogRef = this.dialog.open(PersonalInfoPopupComponent, {
      data: { uid: 'uid' },
    });
  }
  getUser(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe((res: any) => {
      this.userList = res;
      console.log('users:' + JSON.stringify( this.userList));
      this.isLoading = false;
    });
  }
  getFilteredData(res: string) {
    return this.userList.filter((filterText: any) => {
      return filterText.firstName.toLowerCase().includes(res);
    });
  }
  getCustomerList(uid: string) {
    this.isLoadingCustomer = true;
    this.userService.getCustomer(uid).subscribe((res: any) => {
      this.customerList = res;
      this.isLoadingCustomer = false;
    });
  }
}
