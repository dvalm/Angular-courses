import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
/* tslint:disable */
    //1,2,3 are fake user ids
    private users: User[] = [new User(1, 'name1', 'lastName1', 'name1@mail.com', '111'),
                        new User(2, 'name2', 'lastName2', 'name2@mail.com', '222'),
                        new User(4, 'lera', 'lera2', 'lera', 'lera'),
                        new User(3, 'name3', 'lastName3', 'name3@mail.com', '333')];
    private readonly token: string = 'userToken';
    private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
/* tslint: enable */

    constructor(private router: Router){}

    public isAuthenticated(): Observable<boolean> {
        this.readUserFromLocalStorage();
        return this._isAuthenticated.asObservable();
    }

    public login(email: string, password: string): void {
        const matchedUser = this.users.find( (user: User) => user.email === email && user.password === password);
        if (matchedUser) {
            localStorage.setItem(this.token, JSON.stringify(matchedUser));
            this._isAuthenticated.next(true);
            this.router.navigateByUrl('');
        }
    }

    public logout(): void {
        this._isAuthenticated.next(false);
        localStorage.removeItem(this.token);
        this.router.navigateByUrl('/login');
    }

    public getUserInfo(): User {
        const user: User = JSON.parse(localStorage.getItem(this.token));
        return user ? user : null ;
    }

    private readUserFromLocalStorage(): void {
        const userInLocalStorage = localStorage.getItem(this.token);
        if (userInLocalStorage) {
            const matchedUser = JSON.parse(userInLocalStorage);
            if (this.users.find( (user: User) => user.email === matchedUser.email && user.password === matchedUser.password)) {
                this._isAuthenticated.next(true);
            }
        }
    }
}
