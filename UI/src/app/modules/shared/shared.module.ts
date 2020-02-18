import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/auth.interceptor';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { LoginComponent } from 'src/app/modules/shared/components/login/login.component';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { BreadcrumbsComponent } from 'src/app/modules/shared/components/breadcrumbs/breadcrumbs.component';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import {
  ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';

const declarations = [
  HeaderComponent,
  LoginComponent,
  FooterComponent,
  BreadcrumbsComponent,
  ConfirmationDeleteModalComponent,
  ConfirmationDontSaveModalComponent
];

@NgModule({
  declarations: [ ...declarations ],
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
  entryComponents: [ ConfirmationDeleteModalComponent, ConfirmationDontSaveModalComponent ],
  exports: [
    TranslateModule,
    HttpClientModule,
    ...declarations
  ]
})
export class SharedModule { }
