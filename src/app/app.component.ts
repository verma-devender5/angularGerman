import { Component, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './Service/Auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  currentLanguage: any = 'de';
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public translate: TranslateService,
    private swUpdate: SwUpdate
  ) {
    translate.addLangs(['en', 'de']);
    if (window.localStorage.getItem('language') != null) {
      this.currentLanguage = window.localStorage.getItem('language');
      translate.setDefaultLang(this.currentLanguage);
    } else {
      window.localStorage.setItem('language', 'de');
      translate.setDefaultLang('de');
    }
  }

  ngOnInit(): void {
    // this.router.events.subscribe((e) => {
    //   if (e instanceof ActivationStart && e.snapshot.outlet === 'admin')
    //     console.log('matched');
    //   this.outlet.deactivate();
    // });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }
}
