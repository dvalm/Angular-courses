import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { LoginComponent } from 'src/app/modules/shared/components/header/login/login.component';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { BreadcrumbsComponent } from 'src/app/modules/shared/components/breadcrumbs/breadcrumbs.component';

const declarations = [
  HeaderComponent,
  LoginComponent,
  FooterComponent,
  BreadcrumbsComponent
];

@NgModule({
  declarations: [ declarations ],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    declarations
  ]
})
export class SharedModule { }
