import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTHORIZATION_REDUSER_NODE } from './authorization.reduser';
import { User } from 'src/app/modules/shared/models/user';
import { AuthorizationState } from './authorization.state';

export const authorizationFeaturesSelector = createFeatureSelector<AuthorizationState>(AUTHORIZATION_REDUSER_NODE);

export const authorizationUserSelector = createSelector(
    authorizationFeaturesSelector,
    (state: AuthorizationState): User => state.user
);

export const authorizationUserFirstNameSelector = createSelector(
    authorizationFeaturesSelector,
    (state: AuthorizationState): string => state.user ? state.user.firstName : ''
);

export const isAuthenticatedSelector = createSelector(
    authorizationFeaturesSelector,
    (state: AuthorizationState): boolean => state.isAuthenticated
);
