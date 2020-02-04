import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {
/* tslint:disable */
    //1,2,3 are fake user ids
    private users: User[] = [new User(1, 'name1', 'lastName1', 'name1@mail.com', '111'),
                        new User(2, 'name2', 'lastName2', 'name2@mail.com', '222'),
                        new User(3, 'name3', 'lastName3', 'name3@mail.com', '333')];
    private readonly token: string = 'userToken';
    private _isAuthenticated = false;
/* tslint: enable */

    public isAuthenticated(): boolean {
        this.readUserFromLocalStorage();
        return this._isAuthenticated;
    }

    public login(email: string, password: string): void {
        const matchedUser = this.users.find( (user: User) => user.email === email && user.password === password);
        if (matchedUser) {
            this._isAuthenticated = true;
            localStorage.setItem(this.token, JSON.stringify(matchedUser));
        }
    }

    public logout(): void {
        this._isAuthenticated = false;
        localStorage.removeItem(this.token);
    }

    public getUserInfo(): User {
        const user: User = JSON.parse(localStorage.getItem(this.token));
        return user ? user : null ;
    }

    private readUserFromLocalStorage(): void {
        if (localStorage.getItem(this.token)) {
            const matchedUser = JSON.parse(localStorage.getItem(this.token));
            if (this.users.find( (user: User) => user.email === matchedUser.email && user.password === matchedUser.password)) {
                this._isAuthenticated = true;
            }
        }
    }
}
