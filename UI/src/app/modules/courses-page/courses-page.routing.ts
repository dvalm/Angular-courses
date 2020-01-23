import { Routes, RouterModule } from '@angular/router';
import { CoursesPageComponent } from 'src/app/modules/courses-page/courses-page.component';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CoursesPageComponent
  }
];

export const CoursesPageRoutingModule = RouterModule.forChild(routes);
