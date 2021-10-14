import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/Auth/user.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthMainService } from '../Service/AuthService/auth-main.service';
import { Router } from '@angular/router';
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
    private authService: AuthMainService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}
  name: any = 'got name';

  food: any;
  ngOnInit(): void {
    if (this.authService.isAdmin) {
      this.getUser();
    } else {
      //this.router.navigate(['../notfound/notfound']);
    }
  }
  openModal() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
      }
    });
  }
  getUser(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe((res: any) => {
      this.userList = res;
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
