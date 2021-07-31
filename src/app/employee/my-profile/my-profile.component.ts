import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user/User.model';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  isLoading: boolean = false;
  mydate: any;

  form!: FormGroup;
  submitted: boolean = false;
  userInfo: User = {
    isActive: true,
    createdOn: new Date(),
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    telephone: '',
    fax: '',
    companyOrPrivateAddress: '',
    numberOfIdentityCard: '',
    companyRegistrationNumber: '',
    homePage: '',
    assignedPostalCode: '',
  };
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private translate: TranslateService,
    public router: Router,
    public ngZone: NgZone,
    private notification: NotificationService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.validateForm();
    this.getPersonalInformation();
  }
  resetForm() {
    this.submitted = false;
    let email = this.form.get('email')?.value;
    this.form.setValue({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      assignedPostalCode: '',
      companyRegistrationNumber: '',
      homePage: '',
      numberOfIdentityCard: '',
      companyOrPrivateAddress: '',
      telephone: '',
      fax: '',
      createdOn: Date(),
      isActive: true,
      email: email,
    });
  }
  validateForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      assignedPostalCode: ['', [Validators.required]],
      homePage: ['', [Validators.required]],
      companyRegistrationNumber: ['', [Validators.required]],
      numberOfIdentityCard: ['', [Validators.required]],
      companyOrPrivateAddress: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      createdOn: [Date()],
      isActive: [true],
      email: [{ value: '', disabled: true }],
    });
  }
  getPersonalInformation() {
    this.isLoading = true;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db
          .collection('users')
          .doc(user.uid)
          .get()
          .toPromise()
          .then((result) => {
            const mydata = result.data() as User;

            this.form.patchValue({
              firstName: mydata.firstName,
              lastName: mydata.lastName,
              telephone: mydata.telephone,
              fax: mydata.fax,
              assignedPostalCode: mydata.assignedPostalCode,
              homePage: mydata.homePage,
              companyRegistrationNumber: mydata.companyRegistrationNumber,
              numberOfIdentityCard: mydata.numberOfIdentityCard,
              companyOrPrivateAddress: mydata.companyOrPrivateAddress,
              email: user.email,
              dateOfBirth: new Date(2022, 5, 6),
            });
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db
          .collection('users')
          .doc(user.uid)
          .update({
            firstName: this.form.get('firstName')?.value,
            lastName: this.form.get('lastName')?.value,
            dateOfBirth: this.form.get('dateOfBirth')?.value,
            assignedPostalCode: this.form.get('assignedPostalCode')?.value,
            homePage: this.form.get('homePage')?.value,
            companyRegistrationNumber: this.form.get(
              'companyRegistrationNumber'
            )?.value,
            numberOfIdentityCard: this.form.get('numberOfIdentityCard')?.value,
            companyOrPrivateAddress: this.form.get('companyOrPrivateAddress')
              ?.value,
            fax: this.form.get('fax')?.value,
            telephone: this.form.get('telephone')?.value,
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
}
