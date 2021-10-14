import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/createcustomer/customer.service';
import Customer from 'src/app/models/customer/customer.model';
import { NotificationService } from 'src/app/notification.service';
import { PersonalInfoPopupComponent } from 'src/app/personal-info-popup/personal-info-popup.component';
import { UserService } from 'src/app/Service/Auth/user.service';
import { AuthMainService } from 'src/app/Service/AuthService/auth-main.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  isLoading: boolean = false;
  isLoadingCustomer: boolean = false;
  userList: any;
  customerList: any = [];
  userCount: boolean = false;
  searchText: string = '';

  pageTotal: any = [];
  lastItemResult: any;
  pageLimit: number = 10;
  //Models for Input fields
  nameValue: string = '';
  placeValue: string = '';

  //Data object for listing items
  tableData: any[] = [];

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  firstRecord: any;
  lastRecord: any;
  totalOnLastPage: any;
  totalPagingCount: any;
  globalCurrentPage: any = 1;
  hdnCurrentPage: number = 0;
  disablePrevious: boolean = false;
  disableNext: boolean = false;
  constructor(
    private userService: UserService,
    private authService: AuthMainService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private _customerService: CustomerService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private firestore: AngularFirestore
  ) {}
  name: any = 'got name';

  food: any;
  ngOnInit(): void {
    this.getUser();
  }

  openModal1() {
    const dialogRef = this.dialog.open(PersonalInfoPopupComponent, {
      data: { name: this.name },
      disableClose: true,
    });
  }
  getUser(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe((res: any) => {
      console.log(res);
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
    console.log(uid);
    this.getCustomerFistTime(uid);
    // this.userService.getCustomer(uid).subscribe((res: any) => {
    //   this.customerList = res;

    //   this.isLoadingCustomer = false;
    // });
  }
  nextPageHandle(uid: any) {
    this.globalCurrentPage++;
    if (this.globalCurrentPage == this.totalPagingCount) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    this.getCurrentPage(this.globalCurrentPage, uid);
  }
  previousPageHandle(uid: any) {
    this.globalCurrentPage--;
    if (this.globalCurrentPage == 1) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }
    this.getCurrentPage(this.globalCurrentPage, uid);
  }
  getCurrentPage(currentPage: any, uid: any) {
    if (currentPage == 1) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }

    if (currentPage == this.totalPagingCount) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    this.globalCurrentPage = 0;
    this.hdnCurrentPage = currentPage;
    this.globalCurrentPage = currentPage;
    console.log(this.globalCurrentPage);

    this.firestore

      .collection('customers', (ref) =>
        ref
          .where('createdBy', '==', uid)
          .orderBy('createdOn', 'desc')
          .limit(currentPage * this.pageLimit)
      )
      .snapshotChanges()
      .subscribe((response) => {
        this.firstRecord =
          response[
            currentPage == 1 ? 0 : response.length - this.pageLimit
          ].payload.doc;
        this.lastRecord = response[response.length - 1].payload.doc;

        this.firestore

          .collection('customers', (ref) =>
            ref
              .where('createdBy', '==', uid)
              .orderBy('createdOn', 'desc')
              .startAt(this.firstRecord)
              .endAt(this.lastRecord)
              .limitToLast(
                currentPage == this.totalPagingCount
                  ? this.totalOnLastPage
                  : this.pageLimit
              )
          )
          .valueChanges()
          .subscribe((res) => {
            this.customerList = res;
          });
      });
  }
  getCustomerFistTime = async (uid: string) => {
    this.disablePrevious = true;
    this.hdnCurrentPage = 1;
    this.isLoadingCustomer = true;

    this.firestore
      .collection('customers', (ref) => ref.where('createdBy', '==', uid))
      .valueChanges()
      .subscribe((res) => {
        this.totalOnLastPage = 0;
        this.totalOnLastPage = res.length % this.pageLimit;
        let total = Math.ceil(res.length / this.pageLimit);
        this.totalPagingCount = 0;
        this.totalPagingCount = total;
        this.pageTotal = [];
        if (total == 1) {
          this.disableNext = true;
          this.disablePrevious = true;
        } else if (total > 1) {
          this.disableNext = true;
          this.disablePrevious = true;
        }
        for (let i = 0; i < total; i++) {
          this.pageTotal.push(i);
        }
      });
    this.firestore

      .collection<Customer>('customers', (ref1) =>
        ref1
          .where('createdBy', '==', uid)
          .orderBy('createdOn', 'desc')
          .limit(this.pageLimit)
      )
      .valueChanges()
      .subscribe((result) => {
        this.customerList = result;

        this.lastItemResult = result[result.length - 1];
        this.isLoadingCustomer = false;
      });
  };

  getCustomerWithPaging = async (pageNumber: number) => {
    // const first = this.firestore.collection<Customer>('users', (ref) =>
    //   ref.orderBy('firstName').limit(10)
    // );
    // const snapshot = await first.get();
    // // Get the last document
    // const last = snapshot.docs[snapshot.docs.length - 1];
    this.isLoadingCustomer = true;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('users')
          .doc(user.uid)
          .collection<Customer>('customers', (ref) =>
            ref.orderBy('createdOn').startAfter(0).limit(100)
          )
          .valueChanges()
          .subscribe((res) => {
            this.customerList = res;
            let totatal = this.customerList.length;
            for (let i = 0; i < totatal; i++) {
              this.pageTotal.push(i + 1);
            }
            console.log(this.pageTotal);
            this.isLoadingCustomer = false;
          });
      }
    });
  };
}
