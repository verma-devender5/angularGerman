import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  userInfo: any;
  uid: any;
  constructor(
    private firestore: AngularFirestore,

    private db: AngularFirestore,

    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getCustomer = () => {
    return this.firestore
      .collection('users')
      .doc(this.uid)
      .collection('customers')
      .valueChanges();
  };
}
