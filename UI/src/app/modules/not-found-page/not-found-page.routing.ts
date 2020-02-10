import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './not-found-page.component';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NotFoundPageRoutingModule { }
