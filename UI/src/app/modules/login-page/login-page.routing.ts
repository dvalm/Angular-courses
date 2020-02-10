import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { NgModule } from '@angular/core';

/* tslint:disable:typedef */
/* tslint:disable:arrow-parens */

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
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
export class LoginPageRoutingModule { }
