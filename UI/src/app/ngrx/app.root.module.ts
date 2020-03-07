import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthorizationStoreModule } from './authorization/authorization.store.module';

@NgModule({
    imports: [
        AuthorizationStoreModule,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
    ],
})

export class AppRootModule {}
