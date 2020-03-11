import { Injectable } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../interfaces/courses';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/* tslint:disable */
// 6 courses should be loaded in one request and placed on user screen
const amountCoursesInPage = 6;
/* tslint:enable */

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public coursesLength = 0;
    private _baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient) {}

    public readAllCourses(): Observable<Course[]> {
        if (this.coursesLength === 0) {
            return this.getCourses(`/courses?start=0&count=${amountCoursesInPage}`);
        } else {
            return this.loadCourses();
        }
    }

    public loadCourses(): Observable<Course[]> {
        return this.getCourses(`/courses?start=${this.coursesLength}&count=${amountCoursesInPage}`);
    }

    public createCourse(course: Course): Observable<ICourse> {
        return this.http.post(`${this._baseURL}/courses/`, {
            id: course.id,
            name: course.title,
            description: course.description,
            isTopRated: course.isTopRated,
            date: course.creationDate.toString(),
            authors: [],
            length: course.duration
        });
    }

    public updateCourse(config: ICourse): Observable<ICourse> {
        return this.http.put(`${this._baseURL}/courses/` + config.id, {
            id: config.id,
            name: config.title,
            description: config.description,
            isTopRated: config.isTopRated,
            date: config.creationDate.toString(),
            authors: [],
            length: config.duration
        });
    }

    public searchCourses(searchText: string): Observable<Course[]> {
        if (searchText !== '') {
            return this.getCourses(`/courses?textFragment=${searchText}`);
        } else {
            return this.readAllCourses();
        }
    }

    public deleteCourse(course: Course): Observable<object> {
        return this.http.delete(`${this._baseURL}/courses/${course.id}`);
    }

    private getCourses(url: string = `/courses?start=0&count=${amountCoursesInPage}`): Observable<Course[]> {
        return this.http.get<Course[]>(this._baseURL + url).pipe(
            map((data: Course[]) => {
                const courses = data.map(
                    (course: ICourse) => new Course(course.id, course.name, course.date, course.length,
                        course.description, course.isTopRated)
                );
                if (url.includes('start=0') || url.includes('textFragment')) {
                    this.coursesLength = courses.length;
                } else {
                    this.coursesLength += courses.length;
                }
                return courses;
            })
        );
    }
}
