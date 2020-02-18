import {Injectable} from '@angular/core';
import data from 'src/app/modules/courses-page/models/courses.json';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../../courses-page/interfaces/courses';
import { TNullable } from '../../courses-page/types/nullable.type';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public courses: Course[] = [];
/* tslint:disable */
    // 6 is random number
    private maxCourseAmount = 6;
/* tslint:enable */
    constructor() {
        this.courses = data.courses.slice(0, this.maxCourseAmount).map( (el: ICourse) => {
            return new Course(el.id, el.name, el.date, el.length, el.description, el.isTopRated);
        });
    }

    public getAllCourses(): Course[] {
        return this.courses;
    }

    public createCourse(course: Course): void {
        this.courses.push(course);
    }

    public getCourseById(id: number): TNullable<Course> {
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
