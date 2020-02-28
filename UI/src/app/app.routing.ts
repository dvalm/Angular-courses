import { Routes, RouterModule } from '@angular/router';
import { CoursesGuard } from './modules/shared/guards/courses.guard';
import { LoginGuard } from './modules/shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses',
  },
/* tslint:disable:arrow-parens */
/* tslint:disable:typedef */
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./modules/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'courses',
    canActivate: [CoursesGuard],
    loadChildren: () => import('./modules/courses-page/courses-page.module').then(m => m.CoursesPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found-page/not-found-page.module').then(m => m.NotFoundPagePageModule)
  },
/* tslint:enable:arrow-parens */
/* tslint:enable:typedef */
];

export const AppRouting = RouterModule.forRoot(routes);
