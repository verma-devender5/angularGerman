import { DatePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import Customer from 'src/app/models/customer/customer.model';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  providers: [DatePipe],
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
  customerList: any;
  isSaved: boolean = false;
  isLoading: boolean = false;
  form!: FormGroup;
  submitted: boolean = false;
  subscription!: Subscription;
  uid: string = '';
  customer: Customer = {
    id: '',
    branch: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    owner: '',
    email: '',
    telephone: '',
    fax: '',
    homePage: '',
    notations: '',
    createdBy: '',
    createdOn: '',
  };
  branches: any = [];
  constructor(
    private _customerService: CustomerService,
    private fb: FormBuilder,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private translate: TranslateService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getBranchList();
    this.validateForm();
  }

  validateForm() {
    this.form = this.fb.group({
      createdBy: [''],
      street: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      fax: [''],
      homePage: [''],
      notations: ['', [Validators.required]],
      createdOn: [''],
      otherbranch: [''],
      confirmData: [false, [Validators.requiredTrue]],
    });
  }
  get f() {
    return this.form.controls;
  }
  getBranchList() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.db
          .collection('branches')
          .valueChanges({ idField: 'id' })
          .subscribe((result) => {
            this.branches = result.map((doc) => {
              return doc;
            });
            console.log(this.branches);
          });
      }
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.afAuth.authState.subscribe((user) => {
      let ExistDoc: boolean = false;
      if (user) {
        var branchName = this.form.get('otherbranch')?.value;
        console.log(branchName.toLowerCase());
        var selectedBranchValue = this.form.get('branch')?.value;
        console.log(selectedBranchValue);
        var mainBranchName =
          selectedBranchValue != 'other'
            ? this.branches.filter(
                (v: any) => v.id == this.form.get('branch')?.value
              )[0].branchName_de
            : '';

        this.db
          .collection('branches')
          .get()
          .toPromise()
          .then((snapshot) => {
            if (selectedBranchValue == 'other') {
              var docdetail = snapshot.docs.map((doc) => doc.data() as Branch);
              for (let i = 0; i < docdetail.length; i++) {
                if (!ExistDoc) {
                  console.log(docdetail[i].branchName_de.toLowerCase());
                  if (
                    docdetail[i].branchName_de.toLowerCase() ==
                    branchName.toLowerCase()
                  ) {
                    ExistDoc = true;
                  }
                }
              }
            }
            if (!ExistDoc) {
              if (selectedBranchValue == 'other') {
                this.db
                  .collection('branches')
                  .add({
                    branchName_de: branchName,
                  })
                  .then((docRef) => {
                    console.log('other Id : ' + docRef.id);
                    console.log(this.form.get('branch')?.value);
                    this.db
                      .collection('customers')
                      .add({
                        createdBy: user.uid,
                        street: this.form.get('street')?.value,
                        branchId:
                          this.form.get('branch')?.value == 'other'
                            ? docRef.id
                            : this.form.get('branch')?.value,
                        branch:
                          this.form.get('branch')?.value == 'other'
                            ? this.form.get('otherbranch')?.value
                            : mainBranchName,
                        houseNumber: this.form.get('houseNumber')?.value,
                        postalCode: this.form.get('postalCode')?.value,
                        city: this.form.get('city')?.value,
                        owner: this.form.get('owner')?.value,
                        email: this.form.get('email')?.value,
                        telephone: this.form.get('telephone')?.value,
                        fax: this.form.get('fax')?.value,
                        homePage: this.form.get('homePage')?.value,
                        notations: this.form.get('notations')?.value,
                        createdOn: new Date().getTime(),

                        confirmData: this.form.get('confirmData')?.value,
                      })
                      .then((docRef) => {
                        this.onReset();
                        this.notification.showSuccess(
                          'Record saved successfully.',
                          'Success'
                        );
                      })
                      .catch((error) => {
                        console.error('Error adding document: ', error);
                        //this.notification.showError('Some error occurred.', 'Fail');
                      });
                  })
                  .catch((error) => {
                    console.error('Error adding document: ', error);
                    //this.notification.showError('Some error occurred.', 'Fail');
                  });
              } else {
                this.db
                  .collection('customers')
                  .add({
                    createdBy: user.uid,
                    street: this.form.get('street')?.value,
                    branchId: this.form.get('branch')?.value,
                    branch: mainBranchName,
                    houseNumber: this.form.get('houseNumber')?.value,
                    postalCode: this.form.get('postalCode')?.value,
                    city: this.form.get('city')?.value,
                    owner: this.form.get('owner')?.value,
                    email: this.form.get('email')?.value,
                    telephone: this.form.get('telephone')?.value,
                    fax: this.form.get('fax')?.value,
                    homePage: this.form.get('homePage')?.value,
                    notations: this.form.get('notations')?.value,
                    createdOn: new Date().getTime(),

                    confirmData: this.form.get('confirmData')?.value,
                  })
                  .then((docRef) => {
                    this.onReset();
                    this.notification.showSuccess(
                      'Record saved successfully.',
                      'Success'
                    );
                  })
                  .catch((error) => {
                    console.error('Error adding document: ', error);
                    //this.notification.showError('Some error occurred.', 'Fail');
                  });
              }
            } else {
              this.notification.showError(
                'Branch Name Already Exists.',
                'Error'
              );
            }
          });
      }
    });
  }
  selectChange(event: any) {
    let eventValue = event.target.value;
    console.log(eventValue);
    const otherbranch = <FormControl>this.form.get('otherbranch');
    const branch = <FormControl>this.form.get('branch');

    if (eventValue == 'other') {
      console.log('enabled');
      otherbranch.setValidators([Validators.required]);
    } else {
      otherbranch.setValidators(null);
    }

    otherbranch.updateValueAndValidity();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onReset() {
    this.submitted = false;
    this.form.reset();
    this.validateForm();
  }
}
export default class Branch {
  id: string = '';
  branchName_de: string = '';
  branchName_en: string = '';
  position: string = '';
}
