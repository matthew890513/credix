import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';
import { take, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, TranslateModule],
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrls: ['./auth-redirect.component.scss'],
})
export class AuthRedirectComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private translate: TranslateService
  ) {
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    const browserLang = navigator.language.split('-')[0];
    const langToUse = translate.getLangs().includes(browserLang)
      ? browserLang
      : 'es';
    translate.use(langToUse);
  }

  ngOnInit(): void {
    this.sessionService.initializeSession();

    /*if (this.sessionService.isTokenExpired()) {
      console.log('Token expired');
      this.sessionService.clearSession();
      this.router.navigate(['/login']);
      return;
    }*/

    this.sessionService.isLogged$
      .pipe(
        take(1),
        switchMap((isLogged) =>
          timer(1500).pipe(
            // ⏳ 1.5 segundos de delay
            switchMap(() => [isLogged])
          )
        )
      )
      .subscribe((isLogged) => {
        if (isLogged) {
          this.router.navigate(['/app']);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
