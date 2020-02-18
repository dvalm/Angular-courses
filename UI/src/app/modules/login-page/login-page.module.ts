import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from 'src/app/modules/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page.routing';

const declarations = [
  LoginPageComponent
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
