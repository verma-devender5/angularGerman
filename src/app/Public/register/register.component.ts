import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Interface/User/IUser';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';
import { AuthMainService } from 'src/app/Service/AuthService/auth-main.service';
import { EncryptionService } from 'src/app/Service/EncryptionService/encryption.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loginForm!: FormGroup;

  loginUser: IUser = {
    uid: '',
    password: '',
    email: '',
  };

  submitted: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private encrypt: EncryptionService
  ) {}

  ngOnInit(): void {
    // const encrypted = this.encrypt.encryptionAES('structurEmployee');
    // const decrypted = this.encrypt.decryptionAES(encrypted);
    // console.log(encrypted);
    // console.log(decrypted);
    this.validateLoginForm();
  }
  get f() {
    return this.loginForm.controls;
  }

  validateLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
        ],
      ],
      secretKey: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  resetForm = () => {
    // this.loginForm.setValue({ email: '', password: '', secretKey: '' });
    this.loginForm.reset();
  };
  onSubmit = () => {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const encrypted = this.loginForm.get('secretKey')?.value;
    console.log(encrypted);
    const decrypted = this.encrypt.decryptionAES(encrypted);
    console.log(decrypted);
    if (decrypted != 'structurEmployee') {
      this.notification.showError('Wrong secret key', 'Error');
      return;
    }

    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    let firstName = this.loginForm.get('firstName')?.value;
    let lastName = this.loginForm.get('lastName')?.value;
    this.authService
      .SignUpNew(email, password, firstName, lastName)
      .then((res) => {
        this.resetForm();
      })
      .catch((error) => {
        //console.error(error);
        //this.notification.showError('Some error occurred.', 'Error');
      });
  };
}
