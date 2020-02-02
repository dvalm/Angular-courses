import { Routes, RouterModule } from '@angular/router';
// import {TodoComponent} from './modules/feature/components/todo/todo.component';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    // component: TodoComponent
    // If your future module not lazy loaded, you should using this way + import your feature module to app module
    loadChildren: () => import('./modules/courses-page/courses-page.module').then(m => m.CoursesPageModule)
    // it's lazy module, all routing in this path will be perform by feature.routing.ts
  }
];

export const AppRouting = RouterModule.forRoot(routes);
