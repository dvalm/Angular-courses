import { Action } from '@ngrx/store';
import { IUser } from 'src/app/modules/shared/interfaces/user';

export enum AuthorizationActionsType {
    logout = '[Authorization] user logout',
    loginUser = '[Authorization] user login',
    userLoginSuccess = '[Authorization] user logged successfully',
    userLoginError = '[Authorization] login error',
    getUser = '[Authorization] get user from LocalStorage',
    getUserError = '[Authorization] get user error',
    setUserInfo = '[Authorization] set user info',
    setIsAuthenticated = '[Authorization] set isAuthenticated',
}
/* tslint:disable:max-classes-per-file */
export class LoginUserLogoutAction implements Action {
    readonly type = AuthorizationActionsType.logout;
    constructor() {}
}

export class SetUserInfoAction implements Action {
    readonly type = AuthorizationActionsType.setUserInfo;
    constructor (public payload: {user: IUser}) {}
}

export class LoginUser implements Action {
    readonly type = AuthorizationActionsType.loginUser;
    constructor(public payload: {email: string, password: string}) {}
}

export class UserLoginSuccess implements Action {
    readonly type = AuthorizationActionsType.userLoginSuccess;
    constructor() {}
}

export class UserLoginError implements Action {
    readonly type = AuthorizationActionsType.userLoginError;
    constructor() {}
}

export class GetUser implements Action {
    readonly type = AuthorizationActionsType.getUser;
    constructor() {}
}

export class GetUserError implements Action {
    readonly type = AuthorizationActionsType.getUserError;
    constructor() {}
}

export class SetIsAuthenticated implements Action {
    readonly type = AuthorizationActionsType.setIsAuthenticated;
    constructor (public payload: {isAuthenticated: boolean}) {}
}
/* tslint:enable:max-classes-per-file */
export type AuthorizationAction = LoginUserLogoutAction
    | SetUserInfoAction
    | LoginUser
    | UserLoginSuccess
    | UserLoginError
    | SetIsAuthenticated
    | GetUser
    | GetUserError;
