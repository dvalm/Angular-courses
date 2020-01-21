import { ICourse } from "../interfaces/courses";

export class Course { //implements ICourse {

    id: number;    
    title: string;
    creationDare: Date;
    duration: number;
    description: string;

    constructor(id: number, title: string, creationDare: string, duration: number, description: string) {
        this.id = id;
        this.title = title;
        this.creationDare = new Date(creationDare);
        this.duration = duration;
        this.description = description;
    }

    // id: number;    
    // name: string;
    // date: Date;
    // length: number;
    // description: string;
    // isTopRated: boolean;
    // authors: any;


    // constructor(id: number, name: string, date: Date, length: number, description: string, isTopRated: boolean, authors: any) {
    //     this.id = id;
    //     this.name = name;
    //     this.date = date;
    //     this.length = length;
    //     this.description = description;
    //     this.isTopRated = isTopRated;
    //     this.authors = authors;
    // }

}