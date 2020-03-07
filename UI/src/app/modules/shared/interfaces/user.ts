import { IUserName } from './user-name';

export interface IUser {
    id: number;
    name?: IUserName;
    fakeToken?: string;
    login?: string;
    password?: string;
    firstNane?: string;
    lastName?: string;
    email?: string;
}
