import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/Interface/User/IUser';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';

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
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.validateLoginForm();
  }
  get f() {
    return this.loginForm.controls;
  }

  validateLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit = () => {
    if (this.loginForm.invalid) {
      return;
    }
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    console.log(email + ' : ' + password);
    this.authService
      .SignUpNew(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  onSubmitreg = () => {
    this.authService
      .SignUp('monty2@gmail.com', '1234567')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
