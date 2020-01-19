import { ICourse } from "../interfaces/courses";

class Course implements ICourse {

    id: number;    
    title: string;
    creationDare: Date;
    duration: number;
    description: string;

    constructor(id: number, title: string, creationDare: Date, duration: number, description: string) {
        this.id = id;
        this.title = title;
        this.creationDare = creationDare;
        this.duration = duration;
        this.description = description;
    }
}