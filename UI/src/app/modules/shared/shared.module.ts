import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from 'src/app/modules/shared/components/header/header.component';
import { LoginPanelComponent } from 'src/app/modules/shared/components/login-panel/login-panel.component';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { BreadcrumbsComponent } from 'src/app/modules/shared/components/breadcrumbs/breadcrumbs.component';
import {
  ConfirmationDeleteModalComponent
} from 'src/app/modules/shared/components/confirmation-delete-modal/confirmation-delete-modal.component';
import {
  ConfirmationDontSaveModalComponent
} from 'src/app/modules/shared/components/confirmation-dont-save-modal/confirmation-dont-save-modal.component';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';

const declarations = [
  HeaderComponent,
  LoginPanelComponent,
  FooterComponent,
  BreadcrumbsComponent,
  ConfirmationDeleteModalComponent,
  ConfirmationDontSaveModalComponent,
  LoadingBlockComponent,
];

@NgModule({
  declarations: [ ...declarations ],
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
  ],
  providers: [],
  entryComponents: [
    ConfirmationDeleteModalComponent,
    ConfirmationDontSaveModalComponent,
    LoadingBlockComponent
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    ...declarations
  ]
})
export class SharedModule { }
