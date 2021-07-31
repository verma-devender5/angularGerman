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
  customerList: any;
  isLoading: boolean = false;
  constructor(
    private _customerService: CustomerService,
    private notification: NotificationService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer = async () => {
    this.isLoading = true;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.firestore

          .collection('users')
          .doc(user.uid)
          .collection<Customer>('customers', (ref) =>
            ref.orderBy('createdOn').startAfter(2).limit(6)
          )
          .valueChanges()
          .subscribe((res) => {
            this.customerList = res;
            this.isLoading = false;
          });
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
        const r1 = this.firestore.collection('users').doc(user.uid).get();
        console.log(r1);

        this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('customers')
          .valueChanges()
          .subscribe((res) => {
            this.customerList = res;
            this.isLoading = false;
          });
      }
    });
  };
}
