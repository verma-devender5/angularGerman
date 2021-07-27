import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';
import { IUser } from 'src/app/Interface/User/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUser: IUser = {
    uid: '',
    password: '',
    email: '',
  };
  loginForm!: FormGroup;
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
    console.log(this.loginForm.value);
    this.authService
      .SignIn(this.loginForm.value)
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
