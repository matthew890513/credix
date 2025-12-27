import { Routes } from '@angular/router';
import { AuthGuard } from '../app/core/guards/auth-guard.guard';
import { LoggedRedirectGuard } from '../app/core/guards/logged-redirect.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoggedRedirectGuard],
    loadComponent: () =>
      import('./modules/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/main/main.routes').then((m) => m.mainRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('../app/modules/_shared/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];