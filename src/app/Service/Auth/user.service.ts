import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,

    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        user.uid;
      }
    });
  }
  getCustomer = (uid: string) => {
    return this.db
      .collection('users')
      .doc(uid)
      .collection('customers')
      .valueChanges();
  };
  getUser = () => {
    return this.db
      .collection('users', (ref) =>
        ref
          .where('role', 'array-contains', 'user')
          .orderBy('firstName', 'asc')
          .orderBy('lastName', 'asc')
      )
      .valueChanges();
  };
}
