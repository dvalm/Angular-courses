import { ICourse } from '../interfaces/courses';
import { Author } from './author';

const idDefaultValue = parseInt(Math.random().toFixed(7).slice(2), 10);

export class Course implements ICourse {

    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    isTopRated: boolean;
    authors: Author[];

    constructor(id: number = idDefaultValue, title: string = '', creationDate: string = null,
                duration: number = null, description: string = '', isTopRated: boolean = false,
                authors: Author[] = []) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate ? new Date(creationDate) : null;
        this.duration = duration;
        this.description = description;
        this.isTopRated = isTopRated;
        this.authors = authors;
    }
}
