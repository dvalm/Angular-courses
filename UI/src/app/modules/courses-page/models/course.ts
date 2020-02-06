import { ICourse } from '../interfaces/courses';
/* tslint:disable */
// 7 is the number with we fixed randomNumber
// 2 is the number of start chart in randomNumber: 0,nnnnnnnnnn
const idDefaultValue = parseInt(Math.random().toFixed(7).slice(2), 10);
/* tslint:enable */
export class Course implements ICourse {

    id: number;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    isTopRated: boolean;

    constructor(id: number = idDefaultValue, title: string, creationDate: string,
                duration: number, description: string, isTopRated: boolean) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate ? new Date(creationDate) : null;
        this.duration = duration;
        this.description = description;
        this.isTopRated = isTopRated;
    }
}
