import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';
import {
    AuthorizationActionsType, LoginUserAction, LoginUserErrorAction, LoginUserSuccessAction,
    GetUserErrorAction, GetUserSuccessAction
} from './authorization.action';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IToken } from 'src/app/modules/shared/interfaces/token';
import { User } from 'src/app/modules/shared/models/user';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationState } from './authorization.state';
import { IUser } from 'src/app/modules/shared/interfaces/user';

@Injectable()
export class AthorizationEffects {

    @Effect({ dispatch: false })
    login$ = this.actions$.pipe(
        ofType(AuthorizationActionsType.loginUser),
        switchMap((action: LoginUserAction) => this.authorizationService.login(action.payload.email, action.payload.password).pipe(
            map((token: IToken) => {
                localStorage.setItem(this.authorizationService.token, JSON.stringify(token));
                return this.store$.dispatch(new LoginUserSuccessAction());
            }),
            catchError(() => {
                this.toastr.error('Internal Server Error');
                return of(new LoginUserErrorAction());
            }))
        ),
    );

    @Effect({ dispatch: false })
    getUser$ = this.actions$.pipe(
        ofType(AuthorizationActionsType.getUser),
        switchMap(() => this.authorizationService.readUserFromLocalStorage().pipe(
            map((data: IUser) => {
                const user = new User(data.id, data.name.first,
                    data.name.last, data.login, data.password);
                return this.store$.dispatch(new GetUserSuccessAction({ user: user }));
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
