import { IAuthor } from '../interfaces/author';

export class Author implements IAuthor {

    id: string;
    firstName: string;
    lastName: string;
/* tslint:disable */
// 7 is the number with we fixed randomNumber
// 2 is the number of start chart in randomNumber: 0,nnnnnnnnnn
    constructor(id: string = Math.random().toFixed(7).slice(2), firstName: string = 'firstName',
                lastName: string = 'lastName') {
/* tslint:enable */
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
