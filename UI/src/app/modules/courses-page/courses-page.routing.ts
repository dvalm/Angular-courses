import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoursesDescriptionComponent } from 'src/app/modules/courses-page/components/course-description/course-description.component';
import { CourseListComponent } from 'src/app/modules/courses-page/components/course-list/course-list.component';
import { CoursesPageComponent } from 'src/app/modules/courses-page/courses-page.component';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
    children: [
      {
        path: '',
        component: CourseListComponent
      },
      {
        path: 'new',
        component: CoursesDescriptionComponent
      },
      {
        path: ':id',
        component: CoursesDescriptionComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesPageRoutingModule { }
