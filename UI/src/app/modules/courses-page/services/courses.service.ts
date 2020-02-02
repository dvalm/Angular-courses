import {Injectable} from '@angular/core';
import data from 'src/app/modules/courses-page/models/courses.json';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../interfaces/courses';

@Injectable()
export class CoursesService {

    public courses: Course[] = [];

    constructor() {
        this.courses = data.courses.slice(0, 6).map( el => {
            return new Course(el.id, el.name, el.date, el.length, el.description, el.isTopRated);
        });
    }

    public getCoursesList(): Course[] {
        return this.courses;
    }

    public createCourse(course: Course): void {
        this.courses.push(course);
    }

    public getCourseById(id: number): Course {
        return this.courses.find(
            (course: Course) => course.id === id
        );
    }

    public updateCourse(config: ICourse): void {
        const index = this.courses.findIndex( (item: Course) => item.id === config.id );
        Object.assign(this.courses[index], config);
    }

    public removeCourse(course: Course): void {
        const index = this.courses.findIndex( (item: Course) => item === course );
        this.courses.splice(index, 1);
    }
}
