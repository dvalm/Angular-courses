import { Action } from '@ngrx/store';
import { User } from 'src/app/modules/shared/models/user';

export enum AuthorizationActionsType {
    logout = '[Authorization] user logout',
    loginUser = '[Authorization] user login',
    loginUserSuccess = '[Authorization] user logged successfully',
    loginUserError = '[Authorization] login error',
    getUser = '[Authorization] get user from LocalStorage',
    getUserSuccess = '[Authorization] get user from LocalStorage successfully',
    getUserError = '[Authorization] get user from LocalStorage error',
    setIsAuthenticated = '[Authorization] set isAuthenticated',
}
/* tslint:disable:max-classes-per-file */
export class LoginUserLogoutAction implements Action {
    readonly type = AuthorizationActionsType.logout;
    constructor() {}
}

export class LoginUserAction implements Action {
    readonly type = AuthorizationActionsType.loginUser;
    constructor(public payload: {email: string, password: string}) {}
}

export class LoginUserSuccessAction implements Action {
    readonly type = AuthorizationActionsType.loginUserSuccess;
    constructor() {}
}

export class LoginUserErrorAction implements Action {
    readonly type = AuthorizationActionsType.loginUserError;
    constructor() {}
}

export class GetUserAction implements Action {
    readonly type = AuthorizationActionsType.getUser;
    constructor() {}
}

export class GetUserSuccessAction implements Action {
    readonly type = AuthorizationActionsType.getUserSuccess;
    constructor (public payload: {user: User}) {}
}

export class GetUserErrorAction implements Action {
    readonly type = AuthorizationActionsType.getUserError;
    constructor() {}
}

export class SetIsAuthenticatedAction implements Action {
    readonly type = AuthorizationActionsType.setIsAuthenticated;
    constructor (public payload: {isAuthenticated: boolean}) {}
}
/* tslint:enable:max-classes-per-file */
export type AuthorizationAction = LoginUserLogoutAction
    | LoginUserAction
    | LoginUserSuccessAction
    | LoginUserErrorAction
    | SetIsAuthenticatedAction
    | GetUserAction
    | GetUserSuccessAction
    | GetUserErrorAction;
