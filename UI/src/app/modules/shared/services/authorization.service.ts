import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { IToken } from '../interfaces/token';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    private readonly token: string = 'userToken';
    private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _baseURL = 'http://localhost:3004';
    private _user: BehaviorSubject<User>  = new BehaviorSubject<User>(null);

    constructor(private router: Router,
                private http: HttpClient,
                private toastr: ToastrService) {}

    public isAuthenticated(): Observable<boolean> {
        this.readUserFromLocalStorage();
        return this._isAuthenticated.asObservable();
    }

    public login(email: string, password: string): void {
        this.http.post(`${this._baseURL}/auth/login`, {
            login: email,
            password: password
        }).subscribe(
            (data: IToken)  => {
                localStorage.setItem(this.token, JSON.stringify(data));
                this.readUserFromLocalStorage('');
            },
            () =>  this.toastr.error('Internal Server Error')
        );
    }

    public logout(): void {
        this._isAuthenticated.next(false);
        localStorage.removeItem(this.token);
        this.router.navigateByUrl('/login');
    }

    public getUserInfo(): Observable<User> {
        return this._user.asObservable();
    }

    public setUserInfo(user: User): void {
        this._user.next(user);
    }

    private readUserFromLocalStorage(navigateByURL: string = null): void {
        const userInLocalStorage = localStorage.getItem(this.token);
        if (userInLocalStorage) {
            this.http.post<IUser>(`${this._baseURL}/auth/userInfo`, JSON.parse(localStorage.getItem(this.token))).subscribe(
                (user: IUser) => {
                    this.setUserInfo(new User(user.id, user.name.first, user.name.last, user.login, user.password));
                    this._isAuthenticated.next(true);
                    if (navigateByURL !== null ) {
                        this.router.navigateByUrl(navigateByURL);
                    }
                },
                () => this.toastr.error('Internal Server Error')
            );
        }
    }
}
