import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
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
export class LoginPageRoutingModule { }
