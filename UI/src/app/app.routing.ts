import { Routes, RouterModule } from '@angular/router';
import { CoursesGuard } from './modules/shared/guards/courses.guard';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses',
  },
  {
    path: 'login',
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

];

export const AppRouting = RouterModule.forRoot(routes);
