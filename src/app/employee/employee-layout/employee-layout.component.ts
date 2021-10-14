import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html',
  styleUrls: ['./employee-layout.component.css'],
})
export class EmployeeLayoutComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  currentLanguage: any = 'de';
  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    if (window.localStorage.getItem('language') != null) {
      this.currentLanguage = window.localStorage.getItem('language');
      translate.setDefaultLang(this.currentLanguage);
    } else {
      window.localStorage.setItem('language', 'de');
      translate.setDefaultLang('de');
    }
  }

  ngOnInit(): void {}
 
}
