import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import Customer from '../models/customer/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private dbPath = '/customers';
  userInfo: any;
  uid: any;
  constructor(
    private firestore: AngularFirestore,

    private db: AngularFirestore,

    public afAuth: AngularFireAuth
  ) {}

  getCustomer = () => {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
    console.log(this.uid);
    return this.firestore
      .collection('users')
      .doc(this.uid)
      .collection('customers')
      .valueChanges();
  };
}
