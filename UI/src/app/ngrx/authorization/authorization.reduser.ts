import { AuthorizationAction, AuthorizationActionsType } from './authorization.action';
import { User } from 'src/app/modules/shared/models/user';
import { AuthorizationState, initialState } from './authorization.state';

export const AUTHORIZATION_REDUSER_NODE = 'login';

export function authorizationReduser(state: AuthorizationState = initialState, actoin: AuthorizationAction): AuthorizationState {
    switch (actoin.type) {
        case AuthorizationActionsType.setUserInfo:
            const setUserInfoUser = new User(actoin.payload.user.id, actoin.payload.user.name.first,
                actoin.payload.user.name.last, actoin.payload.user.login, actoin.payload.user.password);
            return {
                ...state,
                isAuthenticated: true,
                user: setUserInfoUser
            };
        case AuthorizationActionsType.setIsAuthenticated:
            const setIsAuthenticatedUser = actoin.payload.isAuthenticated ? state.user : null;
            return {
                ...state,
                isAuthenticated: actoin.payload.isAuthenticated,
                user: setIsAuthenticatedUser
            };
        default:
            return state;
    }
}
