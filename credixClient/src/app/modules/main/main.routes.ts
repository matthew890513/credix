import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CreditsComponent } from './credit/credits.component';

import { NotFoundComponent } from '../_shared/not-found/not-found.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CreditsComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
