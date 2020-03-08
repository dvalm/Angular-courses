import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';
import { AuthorizationActionsType, LoginUserAction, UserLoginErrorAction, UserLoginSuccessAction,
    GetUserAction, SetIsAuthenticatedAction, SetUserInfoAction, GetUserErrorAction } from './authorization.action';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IToken } from 'src/app/modules/shared/interfaces/token';
import { User } from 'src/app/modules/shared/models/user';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationState } from './authorization.state';

@Injectable()
export class AthorizationEffects {

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType(AuthorizationActionsType.loginUser),
        mergeMap((action: LoginUserAction) => this.authorizationService.login(action.payload.email, action.payload.password).pipe(
            map((token: IToken) => {
                localStorage.setItem(this.authorizationService.token, JSON.stringify(token));
                this.store$.dispatch(new SetIsAuthenticatedAction({isAuthenticated: true}));
                this.store$.dispatch(new GetUserAction());
                return this.store$.dispatch(new UserLoginSuccessAction());
            }),
            catchError(() => {
                this.toastr.error('Internal Server Error');
                return of(new UserLoginErrorAction());
            }))
        )
    );

    @Effect({ dispatch: false })
    getUser$ = this.actions$.pipe(
        ofType(AuthorizationActionsType.getUser),
        mergeMap(() => this.authorizationService.readUserFromLocalStorage().pipe(
            map((user: User) => {
                this.store$.dispatch(new SetUserInfoAction({ user: user }));
                this.store$.dispatch(new SetIsAuthenticatedAction({ isAuthenticated: true }));
            }))
        ),
        catchError(() => {
            this.toastr.error('Internal Server Error');
            return of(this.store$.dispatch(new GetUserErrorAction()));
        })
    );

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType(AuthorizationActionsType.logout),
        map(() => this.authorizationService.logout())
    );

    constructor(private actions$: Actions,
        private store$: Store<AuthorizationState>,
        private toastr: ToastrService,
        private authorizationService: AuthorizationService) { }
}
