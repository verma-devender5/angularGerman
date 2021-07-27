import { Component, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
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

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    // this.router.events.subscribe((e) => {
    //   if (e instanceof ActivationStart && e.snapshot.outlet === 'admin')
    //     console.log('matched');
    //   this.outlet.deactivate();
    // });
  }
}
