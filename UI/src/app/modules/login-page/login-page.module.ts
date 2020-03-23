import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from 'src/app/modules/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-page.routing';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:typedef
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    LoginPageRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  exports: [ ...declarations ]
})
export class LoginPageModule { }
