import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SessionData {
  uname?: string; // nombre usuario
  role?: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly SESSION_KEY = 'session';

  private loggedState$ = new BehaviorSubject<boolean>(this.hasSession());

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loggedState$ = new BehaviorSubject<boolean>(this.hasSession());
  }

  initializeSession(): void {
    this.loggedState$.next(this.hasSession());
  }

  hasSession(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.SESSION_KEY);
    }
    return false;
  }

  get isLogged$(): Observable<boolean> {
    return this.loggedState$.asObservable();
  }

  get loggedUser(): SessionData | null {
    if (isPlatformBrowser(this.platformId)) {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  }

  setLoggedUserCreateSession(data: SessionData): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
      this.loggedState$.next(true);
    }
  }

  clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.SESSION_KEY);
      this.loggedState$.next(false);
    }
  }

  isTokenExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const sessionRaw = localStorage.getItem(this.SESSION_KEY);
      if (!sessionRaw) return true;

      try {
        const session = JSON.parse(sessionRaw) as SessionData;
        const token = session.token;
        if (!token) return true;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;
        const now = Math.floor(Date.now() / 1000);

        return now >= exp;
      } catch (e) {
        return true; // Si falla el parseo, el token es inválido
      }
    }

    return true; // Si no estamos en browser (SSR), asume expirado
  }

  setLoggedState(isLogged: boolean): void {
    if (!isLogged) {
      this.clearSession();
    } else {
      this.loggedState$.next(true);
    }
  }

  isLoggedUser(): boolean {
    return this.hasSession();
  }

  getUserName(): string {
    const session = this.loggedUser;
    return session?.uname || '';
  }

  getRoleUserLogged(): string {
    const session = this.loggedUser;
    return session?.role || '';
  }

}
