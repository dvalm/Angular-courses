import { AuthorizationAction, AuthorizationActionsType } from './authorization.action';
import { AuthorizationState, initialState } from './authorization.state';

export const AUTHORIZATION_REDUSER_NODE = 'login';

export function authorizationReduser(state: AuthorizationState = initialState, action: AuthorizationAction): AuthorizationState {
    switch (action.type) {
        // case AuthorizationActionsType.setUserInfo:
        //     const setUserInfoUser = new User(action.payload.user.id, action.payload.user.name.first,
        //         action.payload.user.name.last, action.payload.user.login, action.payload.user.password);
        //     return {
        //         ...state,
        //         isAuthenticated: true,
        //         user: setUserInfoUser
        //     };
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
