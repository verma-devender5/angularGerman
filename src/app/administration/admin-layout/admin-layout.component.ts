import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/Auth/user.service';
import { AuthMainService } from 'src/app/Service/AuthService/auth-main.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthMainService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
