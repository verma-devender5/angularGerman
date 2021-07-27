import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoles } from '../models/user/UserRoles.model';
import { NotificationService } from '../notification.service';
import { AuthService } from '../Service/Auth/auth.service';
import { UserService } from '../Service/Auth/user.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  isSaved: boolean = false;
  searchText: string = '';
  isLoadingCustomer: boolean = false;
  userList: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private db: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.ValidateForm();
    this.getUser();
  }
  ValidateForm = () => {
    this.form = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      roles: ['', [Validators.required]],
    });
  };

  get f() {
    return this.form.controls;
  }
  resetForm = () => {
    this.form.setValue({ firstName: '', lastName: '' });
  };
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let firstName = this.form.controls['firstName'].value;
    let lastName = this.form.controls['lastName'].value;
    let rolevalue = this.form.controls['roles'].value;
    let roles = {
      admin: rolevalue == 'admin' ? true : false,
      user: rolevalue == 'user' ? true : false,
    };

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db
          .collection('users')
          .doc('vDarjTLtDRg7cVHF0uW8a5SdNN23')
          .update({
            firstName: firstName,
            lastName: lastName,
            roles: roles,
          })
          .then(() => {
            this.isLoading = false;
            this.notification.showSuccess(
              'User information updated successfully.',
              'Success'
            );
          })
          .catch((error) => {
            // The document probably doesn't exist.
            this.isLoading = false;
            this.notification.showError('Some error occurred', 'Error');
          });
      }
    });
  }
  getUser(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe((res: any) => {
      this.userList = res;
      this.isLoading = false;
    });
  }
  getCustomerList(id: string) {}
  updateRole(firstName: string, lastName: string, roles: any) {
    this.isLoading = true;
    console.log('roles : ' + JSON.stringify(roles));
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db
          .collection('users')
          .doc('vDarjTLtDRg7cVHF0uW8a5SdNN23')
          .get()
          .toPromise()
          .then((result) => {
            this.form.patchValue({
              firstName: firstName,
              lastName: lastName,
              roles: roles,
            });
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }
}
