import { IUser } from "../interfaces/user";

export class User implements IUser{

    id: number;    
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAuthenticated: boolean;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, isAuthenticated: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isAuthenticated = isAuthenticated;
    }
}