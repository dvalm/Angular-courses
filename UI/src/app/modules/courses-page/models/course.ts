import { ICourse } from '../interfaces/courses';

export class Course implements ICourse {

    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    isTopRated: boolean;

    constructor(id: number, title: string, creationDate: string, duration: number, description: string, isTopRated: boolean) {
        this.id = id;
        this.title = title;
        this.creationDate = new Date(creationDate);
        this.duration = duration;
        this.description = description;
        this.isTopRated = isTopRated;
    }
}
