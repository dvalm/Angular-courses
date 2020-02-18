import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundPageRoutingModule } from './not-found-page.routing';
import { NotFoundPageComponent } from './not-found-page.component';

const declarations = [
  NotFoundPageComponent
];

@NgModule({
  declarations: [ ...declarations ],
  imports: [
    CommonModule,
    FormsModule,
    NotFoundPageRoutingModule
  ],
  providers: [],
  exports: [ ...declarations ]
})
export class NotFoundPagePageModule { }
