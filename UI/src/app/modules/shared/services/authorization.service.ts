import {Injectable} from '@angular/core';
import { User } from "src/app/modules/shared/models/user"
 
@Injectable({
    providedIn: 'root'
})
export class AuthorizationService{

    public users: User[] = [new User(1, "name1", "lastName1", "name1@mail.com", "111", false),
                        new User(2, "name2", "lastName2", "name2@mail.com", "222", false),
                        new User(3, "name3", "lastName3", "name3@mail.com", "333", false)];
    private user: User;

    public login(email: string, password: string):void {
        let user = this.users.find(user => user.email == email && user.password == password);
        if(user){
            this.user = user;
            this.user.isAuthenticated = true;
            console.log("Login as", this.user);
        }else{
            console.log("no such account");
        }
    }

    public logout():void {
        this.user = null;
        console.log("user ", this.user);
    }

    public isAuthenticated():boolean {
        console.log("isAuthenticated ", this.user ? this.user.isAuthenticated : false);
        return this.user ? this.user.isAuthenticated : false;
    }

    public getUserInfo():User {
        console.log("getUserInfo", this.user);
        return this.user ? this.user : {} as User ;
    }

}