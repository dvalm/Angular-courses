import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AUTHORIZATION_REDUSER_NODE, authorizationReduser } from './authorization.reduser';
import { EffectsModule } from '@ngrx/effects';
import { AthorizationEffects } from './authorization.effect';

@NgModule({
    imports: [
        StoreModule.forFeature(AUTHORIZATION_REDUSER_NODE, authorizationReduser),
        EffectsModule.forFeature([AthorizationEffects]),
    ],
})
export class AuthorizationStoreModule {}
