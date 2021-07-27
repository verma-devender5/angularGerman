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
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import Customer from '../models/customer/customer.model';
import { NotificationService } from '../notification.service';

import { AuthService } from '../Service/Auth/auth.service';

import { CustomerService } from './customer.service';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css'],
  providers: [DatePipe],
})
export class CreatecustomerComponent implements OnInit, OnDestroy {
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
  branches: any = [
    { id: '', name: 'Please Select branch' },
    { id: 1, name: 'Pharmacy' },
    { id: 2, name: "Doctors' Office " },
    { id: 3, name: 'Hairdresser' },
    { id: 4, name: "Cosmetics's Studio" },
    { id: 5, name: 'Others' },
  ];
  constructor(
    private _customerService: CustomerService,
    private fb: FormBuilder,
    private db: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private afAuth: AngularFireAuth,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
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
      fax: ['', [Validators.required]],
      homePage: ['', [Validators.required]],
      notations: ['', [Validators.required]],
      createdOn: [new Date().getTime()],
      otherbranch: [''],
    });
  }
  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;

    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        //this.form.get('createdBy')?.setValue(user.uid.toUpperCase());
        this.db
          .collection('users')
          .doc(user.uid)
          .collection('customers')
          .add(this.form.value)
          .then((docRef) => {
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
    });
  }
  selectChange(event: any) {
    const otherbranch = <FormControl>this.form.get('otherbranch');
    const branch = <FormControl>this.form.get('branch');

    if (event == 5) {
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
}
