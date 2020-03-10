import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from 'src/app/modules/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page.routing';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const declarations = [
  LoginPageComponent,
  LoginComponent,
  RegistrationComponent
];

@NgModule({
  declarations: [ ...declarations ],
  imports: [
    CommonModule,
    FormsModule,
    LoginPageRoutingModule
  ],
  providers: [],
  exports: [ ...declarations ]
})
export class LoginPageModule { }
