import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthMainService } from '../AuthService/auth-main.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private db: AngularFirestore,
    private auth: AuthMainService,
    private afAuth: AngularFireAuth
  ) {}
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
          .where('roles.employee', '==', true)
          .orderBy('firstName', 'asc')
          .orderBy('lastName', 'asc')
      )
      .valueChanges();
  };
}
