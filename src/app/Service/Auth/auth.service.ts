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
import { NotificationService } from 'src/app/notification.service';
import { Role } from 'src/app/models/user/Role.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userData: any;
  userInfo: any;
  displayData: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private notification: NotificationService,
    private translate: TranslateService
  ) {}

  // Sign in with email/password
  SignIn(userData: IUser) {
    return this.afAuth

      .signInWithEmailAndPassword(userData.email, userData.password)

      .then((result: any) => {
        this.ngZone.run(() => {
          const usersRef = this.afs
            .collection('users')
            .doc(result.user.uid)
            .get();

          usersRef.subscribe((docSnapshot: any) => {
            if (docSnapshot.exists) {
              usersRef.subscribe((usr) => {
                const userData = usr.data() as UserMore;
                const roles = userData.roles as Role;

                if (roles.admin) {
                  this.router.navigate(['/admin/employees']);
                } else if (roles.employee) {
                  this.router.navigate(['/employee/createcustomer']);
                }
              });
            }
          });
          // this.router.navigate(['user/createcustomer']);
        });
        this.SetUserDataLogin(result.user);
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/wrong-password':
            this.notification.showError(
              this.translate.instant('login.wrongUserNamePassword'),
              this.translate.instant('login.error')
            );
            break;
          case 'auth/user-not-found':
            this.notification.showError(
              this.translate.instant('login.userNotFound'),
              this.translate.instant('login.error')
            );
            break;
          case 'auth/user-disabled':
            this.notification.showError(
              this.translate.instant('login.accountDisabled'),
              this.translate.instant('login.error')
            );
            break;
          case 'auth/too-many-requests':
            this.notification.showError(
              this.translate.instant('login.toManyWrongAttempts'),
              this.translate.instant('login.error')
            );
            break;
          default:
            break;
        }

        // window.alert(error.message);
      });
  }

  SignUpNew(email: any, password: any, firstName: any, lastName: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((registeredUser) => {
        this.afs
          .collection('users')
          .doc(registeredUser.user?.uid)
          .set({
            uid: registeredUser.user?.uid,
            email: registeredUser.user?.email,
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: '',
            companyOrPrivateAddress: '',
            numberOfIdentityCard: '',
            companyRegistrationNumber: '',
            homePage: '',
            telephone: '',
            fax: '',
            assignedPostalCode: '',
            roles: {
              admin: false,
              employee: true,
            },
            createdOn: new Date(),
            isActive: true,
          });
        this.notification.showSuccess(
          this.translate.instant('signup.userCreatedSuccessfully'),
          this.translate.instant('login.success')
        );
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.notification.showError(
              this.translate.instant('signup.emailAlreadyInUse'),
              this.translate.instant('login.error')
            );
            break;

          default:
            this.notification.showError(error.message, 'Error');
            break;
        }

        //window.alert(error.message);
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
            // console.log(error);
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
}
