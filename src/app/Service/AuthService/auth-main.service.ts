import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/user/Role.model';
import { UserMore } from 'src/app/models/user/UserMore.model';
import { UserRoles } from 'src/app/models/user/UserRoles.model';

@Injectable({
  providedIn: 'root',
})
export class AuthMainService {
  userInfo: any;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.userInfo = user;
        this.getCurrentUserRole(user.uid);
        // ...
      } else {
        console.log('no user');
        // User is signed out
        // ...
      }
    });
  }
  getCurrentUserRole(uid: string) {
    const usersRef = this.afs.collection('users').doc(uid).get();

    usersRef.subscribe((docSnapshot: any) => {
      if (docSnapshot.exists) {
        usersRef.subscribe((usr) => {
          const userData = usr.data() as UserMore;

          const roles = userData.roles as Role;

          this.isAdmin = roles.admin;
          this.isEmployee = roles.employee;
        });
      } else {
        this.isAdmin = false;
        this.isEmployee = false;
      }
    });
  }
  isLoggedIn() {
    return this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        return true;
        // ...
      } else {
        return false;
        // User is signed out
        // ...
      }
    });
  }
}
