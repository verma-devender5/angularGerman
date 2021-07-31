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
  isLoading: boolean = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
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
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .SignIn(this.loginForm.value)
      .then((res) => {
        this.isLoading = false;
        // console.log(res);
      })
      .catch((error) => {
        this.isLoading = false;
        //console.error(error);
      });
  };
}
