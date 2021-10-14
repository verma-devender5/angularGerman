import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomerService } from 'src/app/createcustomer/customer.service';
import Customer from 'src/app/models/customer/customer.model';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css'],
  providers: [DatePipe],
})
export class ViewCustomersComponent implements OnInit {
  customerList: any = [];
  isLoading: boolean = false;
  pageTotal: any = [];
  lastItemResult: any;
  pageLimit: number = 10;
  searchText: string = '';
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
    private _customerService: CustomerService,
    private notification: NotificationService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getCustomerFistTime('');
  }
  nextPageHandle() {
    this.globalCurrentPage++;
    if (this.globalCurrentPage == this.totalPagingCount) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
    this.getCurrentPage(this.globalCurrentPage);
  }
  previousPageHandle() {
    this.globalCurrentPage--;
    if (this.globalCurrentPage == 1) {
      this.disablePrevious = true;
    } else {
      this.disablePrevious = false;
    }
    this.getCurrentPage(this.globalCurrentPage);
  }
  getCurrentPage(currentPage: any) {
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
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore

          .collection('customers', (ref) =>
            ref
              .where('createdBy', '==', user.uid)
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
                  .where('createdBy', '==', user.uid)
                  .orderBy('createdOn', 'desc')
                  .startAt(this.firstRecord)
                  .endAt(this.lastRecord)
                  .limitToLast(
                    currentPage == this.totalPagingCount
                      ? this.totalOnLastPage == 0
                        ? this.pageLimit
                        : this.totalOnLastPage
                      : this.pageLimit
                  )
              )
              .valueChanges()
              .subscribe((res) => {
                this.customerList = res;
              });
          });
      }
    });
  }
  getCustomerFistTime = async (sortingParam: string) => {
    this.disablePrevious = true;
    this.hdnCurrentPage = 1;
    this.isLoading = true;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('customers', (ref) =>
            ref.where('createdBy', '==', user.uid)
          )
          .valueChanges()
          .subscribe((res) => {
            this.totalOnLastPage = 0;
            this.totalOnLastPage = res.length % this.pageLimit;
            let total = Math.ceil(res.length / this.pageLimit);

            if (total == 1) {
              this.disableNext = true;
              this.disablePrevious = true;
            } else if (total > 1) {
              this.disableNext = true;
              this.disablePrevious = true;
            }

            this.totalPagingCount = 0;
            this.totalPagingCount = total;
            this.pageTotal = [];

            for (let i = 0; i < total; i++) {
              this.pageTotal.push(i);
            }
          });
        this.firestore
          .collection<Customer>('customers', (ref1) =>
            ref1
              .where('createdBy', '==', user.uid)
              .orderBy('createdOn', 'desc')
              .limit(this.pageLimit)
          )
          .valueChanges()
          .subscribe((result) => {
            this.customerList = result;

            this.lastItemResult = result[result.length - 1];
          });

        this.isLoading = false;
      }
    });
  };

  getCustomerWithPaging = async (pageNumber: number) => {
    // const first = this.firestore.collection<Customer>('users', (ref) =>
    //   ref.orderBy('firstName').limit(10)
    // );
    // const snapshot = await first.get();
    // // Get the last document
    // const last = snapshot.docs[snapshot.docs.length - 1];
    this.isLoading = true;
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
            this.isLoading = false;
          });
      }
    });
  };

  loadItems() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('users')
          .doc(user.uid)
          .collection<Customer>('customers', (ref) =>
            ref.limit(this.pageLimit).orderBy('createdOn', 'desc')
          )
          .snapshotChanges()
          .subscribe(
            (response) => {
              this.firstInResponse = response[0].payload.doc;
              this.lastInResponse = response[response.length - 1].payload.doc;

              this.tableData = [];
              for (let item of response) {
                this.tableData.push(item.payload.doc.data());
              }

              //Initialize values
              this.prev_strt_at = [];
              this.pagination_clicked_count = 0;
              this.disable_next = false;
              this.disable_prev = false;

              //Push first item to use for Previous action
              this.push_prev_startAt(this.firstInResponse);
            },
            (error) => {}
          );
      }
    });
  }

  //Show previous set
  prevPage() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.disable_prev = true;
        this.firestore
          .collection('users')
          .doc(user.uid)
          .collection<Customer>('customers', (ref) =>
            ref
              .orderBy('createdOn', 'desc')
              .startAt(this.get_prev_startAt())
              .endBefore(this.firstInResponse)
              .limit(this.pageLimit)
          )
          .get()
          .subscribe(
            (response) => {
              this.firstInResponse = response.docs[0];
              this.lastInResponse = response.docs[response.docs.length - 1];

              this.tableData = [];
              for (let item of response.docs) {
                this.tableData.push(item.data());
              }

              //Maintaing page no.
              this.pagination_clicked_count--;

              //Pop not required value in array
              this.pop_prev_startAt(this.firstInResponse);

              //Enable buttons again
              this.disable_prev = false;
              this.disable_next = false;
            },
            (error) => {
              this.disable_prev = false;
            }
          );
      }
    });
  }

  nextPage() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore
          .collection('users')
          .doc(user.uid)
          .collection<Customer>('customers', (ref) =>
            ref
              .limit(this.pageLimit)
              .orderBy('createdOn', 'desc')
              .startAfter(this.lastInResponse)
          )
          .get()
          .subscribe(
            (response) => {
              if (!response.docs.length) {
                this.disable_next = true;
                return;
              }

              this.firstInResponse = response.docs[0];

              this.lastInResponse = response.docs[response.docs.length - 1];
              this.tableData = [];
              for (let item of response.docs) {
                this.tableData.push(item.data());
              }

              this.pagination_clicked_count++;

              this.push_prev_startAt(this.firstInResponse);

              this.disable_next = false;
            },
            (error) => {
              this.disable_next = false;
            }
          );
      }
    });
  }

  //Add document
  push_prev_startAt(prev_first_doc: any) {
    this.prev_strt_at.push(prev_first_doc);
  }
  //Remove not required document
  pop_prev_startAt(prev_first_doc: any) {
    this.prev_strt_at.forEach((element: any) => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > this.pagination_clicked_count + 1)
      this.prev_strt_at.splice(
        this.prev_strt_at.length - 2,
        this.prev_strt_at.length - 1
      );
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }

  //Date formate
  readableDate(time: any) {
    var d = new Date(time);
    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
  }
}
