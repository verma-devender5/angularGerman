import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { IUser } from 'src/app/Interface/User/IUser';
import { applicationConstants } from './../../Constants/ApplicationConstants';
import { Observable, throwError } from 'rxjs';
import { AuthConstants } from 'src/app/Constants/AuthConstants';
import { IToken } from 'src/app/Interface/User/IToken';
import { loginApi } from 'src/app/API/login/loginApi';
import { catchError, first, retry } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user/User.model';
import { UserDisplay } from 'src/app/models/user/UserDisplay.model';
import { UserMore } from 'src/app/models/user/UserMore.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData: any;
  userInfo: any;
  displayData: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.getroles();
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     this.afAuth.authState.subscribe((user) => {
    //       if (user != null) {
    //         this.afs.firestore
    //           .collection('users')
    //           .doc(user.uid)
    //           .get()
    //           .then((res) => {
    //             this.userInfo = res.data();
    //           })
    //           .catch((error) => {
    //             console.log(error);
    //           });
    //       }
    //     });
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }
  checkLogin = () => {
    var docRef = this.afs.collection('checkLogin').doc('adminAuthDoc');

    docRef.ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
        this.router.navigate(['/login']);
      });
  };
  // Sign in with email/password
  SignIn(userData: IUser) {
    return this.afAuth

      .signInWithEmailAndPassword(userData.email, userData.password)

      .then((result: any) => {
        this.ngZone.run(() => {
          const nresult = this.afAuth.idTokenResult.subscribe((s) => {
            console.log(s?.token);
          });
          this.router.navigate(['user/createcustomer']);
        });
        this.SetUserDataLogin(result.user);
      })
      .catch((error: any) => {
        window.alert(error.message);
      });
  }
  getroles() {
    this.afAuth.idTokenResult.subscribe((res) => {
      const claim = res?.claims;
      console.log('claim data : ' + JSON.stringify(claim));
    });
  }
  get isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }
  SignUpNew(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((registeredUser) => {
        this.afs.collection('users').add({
          uid: registeredUser.user?.uid,
          email: registeredUser.user?.email,
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          companyOrPrivateAddress: '',
          numberOfIdentityCard: '',
          companyRegistrationNumber: '',
          homePage: '',
          telephone: '',
          fax: '',
          assignedPostalCode: '',
          role: ['user', 'view'],
          createdOn: new Date(),
          isActive: true,
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignUp(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  getUserDetailById = () => {
    return this.afAuth.authState.subscribe((user) => {
      if (user != null) {
        this.afs.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((res) => {
            return res.data() as UserDisplay;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  SetUserDataLogin(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userState: UserDisplay = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userState, {
      merge: true,
    });
  }
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userState: UserMore = {
      uid: user.uid,
      email: user.email,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      companyOrPrivateAddress: '',
      numberOfIdentityCard: '',
      companyRegistrationNumber: '',
      homePage: '',
      telephone: '',
      fax: '',
      assignedPostalCode: '',
      role: ['user', 'view'],
      roles: {
        userrole: true,
      },
      createdOn: new Date(),
      isActive: true,
    };
    return userRef.set(userState, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  registerUser() {
    const customClaims = {
      admin: true,
      accessLevel: 9,
    };
    this.afAuth
      .createUserWithEmailAndPassword('monty@gmail.com', 'monty')
      .then((user) => {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${user.user?.uid}`
        );

        return userRef.set(user, {
          merge: true,
        });
      });
  }
  getCurrentUserRole1() {
    return this.afs.collection('users').snapshotChanges();
  }

  getCurrentUserRole() {
    let userRole: any;
    this.afAuth.authState.subscribe((user) => {
      if (user != null) {
        this.afs.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((res) => {
            userRole = res.data();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    console.log(userRole);
    return userRole;
  }
}
