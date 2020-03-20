import { IAuthor } from '../interfaces/author';

export class Author implements IAuthor {

    id: string;
    firstName: string;
    lastName: string;
    constructor(id: string = Math.random().toFixed(7).slice(2), firstName: string = 'firstName',
                lastName: string = 'lastName') {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
