import { IUser } from "../interfaces/user";

class User implements IUser{

    id: number;    
    firstName: string;
    lastName: string;

    constructor(id: number, firstName: string, lastName: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}