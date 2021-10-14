import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../Service/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData: any;
  IsGerman: any;
  userInfo: any;
  constructor(
    private router: Router,
    public translate: TranslateService,
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user != null) {
        this.afs.firestore
          .collection('users')
          .doc(user.uid)
          .get()
          .then((res) => {
            this.userInfo = res.data();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];

    this.showCurrentLanguage();
  }

  get isAdmin() {
    return this.userInfo && this.userInfo.role[0] == 'admin';
  }
  get isUser() {
    return this.userInfo && this.userInfo.role[0] == 'user';
  }
  sidebarEnable() {
    const body = document.getElementsByTagName('body')[0];

    if (window.innerWidth <= 800 && window.innerHeight <= 800) {
      if (body.classList.contains('enlarged')) {
        body.classList.remove('enlarged');
      } else if (body.classList.contains('sidebar-enable')) {
        body.classList.remove('sidebar-enable');
      } else {
        body.classList.add('sidebar-enable');
      }
    } else {
      if (body.classList.contains('enlarged')) {
        body.classList.remove('enlarged');
        body.classList.remove('sidebar-enable');
      } else {
        body.classList.add('sidebar-enable');
        body.classList.add('enlarged');
      }
    }
  }
  logout() {
    this.authService.SignOut();
  }
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
}
