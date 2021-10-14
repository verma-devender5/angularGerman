import { Component, HostListener, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Service/Auth/auth.service';
import { TokenStorageService } from 'src/app/Service/Auth/token-storage.service';
import { IUser } from 'src/app/Interface/User/IUser';
import { TranslateService } from '@ngx-translate/core';

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
  IsGerman: any;
  loginForm!: FormGroup;
  submitted: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isLoading: boolean = false;
  errorMessage = '';
  roles: string[] = [];

  deferredPrompt: any;
  showButton = false;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.showCurrentLanguage();
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
  switchLang(lang: string) {
    window.localStorage.setItem('language', lang);
    this.IsGerman =
      window.localStorage.getItem('language') == 'de' ? true : false;
    this.translate.use(lang);
  }
  showCurrentLanguage() {
    if (window.localStorage.getItem('language') != null) {
      this.IsGerman =
        window.localStorage.getItem('language') == 'de' ? true : false;
    } else {
      this.IsGerman = 'de';
    }
  }
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }
}
