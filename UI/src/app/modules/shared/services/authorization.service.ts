import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { SetIsAuthenticatedAction } from 'src/app/ngrx/authorization/authorization.action';
import { AuthorizationState } from 'src/app/ngrx/authorization/authorization.state';
import { IToken } from '../interfaces/token';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    public readonly token: string = 'userToken';
    private _baseURL = 'http://localhost:3004';

    constructor(private router: Router,
                private http: HttpClient,
                private store$: Store<AuthorizationState>) {}

    public login(email: string, password: string): Observable<IToken> {
        return this.http.post(`${this._baseURL}/auth/login`, {
            login: email,
            password: password
        });
    }

    public logout(): void {
        this.store$.dispatch(new SetIsAuthenticatedAction({isAuthenticated: false}));
        localStorage.removeItem(this.token);
        this.router.navigateByUrl('/login');
    }

    public readUserFromLocalStorage(): Observable<IUser> {
        const userInLocalStorage = localStorage.getItem(this.token);
        if (userInLocalStorage) {
            return this.http.post<IUser>(`${this._baseURL}/auth/userInfo`, JSON.parse(localStorage.getItem(this.token)));
        }
    }
}
