import { Injectable } from '@angular/core';
import { User } from "src/app/modules/shared/models/user"
 
@Injectable({
    providedIn: 'root'
})
export class AuthorizationService{

    private users: User[] = [new User(1, "name1", "lastName1", "name1@mail.com", "111"),
                        new User(2, "name2", "lastName2", "name2@mail.com", "222"),
                        new User(3, "name3", "lastName3", "name3@mail.com", "333")];
    private readonly token: string = 'userToken';
    private _isAuthenticated: boolean = false;

    public isAuthenticated():boolean {
        return this._isAuthenticated;
    }

    public login(email: string, password: string):void {
        let user = this.users.find(user => user.email == email && user.password == password);
        if(user){
            this._isAuthenticated = true;
            localStorage.setItem(this.token, JSON.stringify(user));
        }
    }

    public logout():void {
        this._isAuthenticated = false;
        localStorage.removeItem(this.token);
    }

    public getUserInfo():User {
        let user: User = JSON.parse(localStorage.getItem(this.token));
        return user ? user : null ;
    }
}