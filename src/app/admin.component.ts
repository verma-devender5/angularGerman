import { Component, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './Service/Auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./app.component.css'],
})
export class AdminComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
