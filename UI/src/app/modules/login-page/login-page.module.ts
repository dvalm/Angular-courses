import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from 'src/app/modules/login-page/login-page.component';
import { FormsModule } from '@angular/forms';

const declarations = [
  LoginPageComponent
];

@NgModule({
  declarations: [ ...declarations ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [],
  exports: [ ...declarations ]
})
export class LoginPageModule { }
