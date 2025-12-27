import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sessionService.isLogged$.pipe(
      take(1),
      map((isLogged) => {
        if (!isLogged) {
          this.router.navigate(['/app']); // <-- esto carga el verificador
          return false;
        }
        return true;
      })
    );
  }
}
