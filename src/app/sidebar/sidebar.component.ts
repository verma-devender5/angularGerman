import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../Service/Auth/auth.service';
import { AuthMainService } from '../Service/AuthService/auth-main.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userInfo: any;
  constructor(
    public authService: AuthMainService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {}
  get isAdmin() {
    return this.authService.isAdmin;
  }
  get isUser() {
    return this.authService.isEmployee;
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
    }
  }
}
