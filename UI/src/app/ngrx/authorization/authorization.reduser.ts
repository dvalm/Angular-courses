import { AuthorizationAction, AuthorizationActionsType } from './authorization.action';
import { AuthorizationState, initialState } from './authorization.state';

export const AUTHORIZATION_REDUSER_NODE = 'login';

export function authorizationReduser(state: AuthorizationState = initialState, action: AuthorizationAction): AuthorizationState {
    switch (action.type) {
        case AuthorizationActionsType.setIsAuthenticated:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.isAuthenticated ? state.user : null
            };
        case AuthorizationActionsType.loginUserSuccess:
            return {
                ...state,
                isAuthenticated: true,
                user: state.user
            };
        case AuthorizationActionsType.loginUserError:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case AuthorizationActionsType.getUserSuccess:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            };
        case AuthorizationActionsType.getUserError:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
}
