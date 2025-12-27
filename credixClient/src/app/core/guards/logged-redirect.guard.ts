import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedRedirectGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.sessionService.isLogged$.pipe(
      take(1),
      map(isLogged => {
        if (isLogged) {
          this.router.navigate(['/app']);
          return false;
        }
        return true;
      })
    );
  }
}
