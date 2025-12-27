import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  let authReq = req;
  let token: string | undefined;

  const user = sessionService.loggedUser;
  if (user?.token) {
    token = user.token;
  }

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.error?.message === 'Token inválido o expirado' ||
        error.status === 401
      ) {
        // Limpia la sesión
        sessionService.clearSession();

        // Redirige al login
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
