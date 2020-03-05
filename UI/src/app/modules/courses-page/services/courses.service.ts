import { Injectable, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../interfaces/courses';
import { TNullable } from '../types/nullable.type';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, filter, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SearchCoursesPipe } from '../pipes/search-courses.pipe';
import { error } from 'protractor';

/* tslint:disable */
// 6 courses should be loaded in one request and placed on user screen
const amountCoursesInPage = 6;
/* tslint:enable */

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private _courses: Course[] = [];
    private _baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient,
                private toastr: ToastrService) {}

    public getAllCourses(): Observable<Course[]> {
        if (this._courses.length !== 0) {
            return of(this._courses);
        }
        return this.getCourses(`/courses?start=0&count=${amountCoursesInPage}`);
    }

    public loadCourses(): Observable<Course[]> {
        return this.getCourses(`/courses?start=${this._courses.length}&count=${amountCoursesInPage}`);
    }

    public createCourse(course: Course): void {
        this.http.post(`${this._baseURL}/courses/`, {
            id: course.id,
            name: course.title,
            description: course.description,
            isTopRated: course.isTopRated,
            date: course.creationDate.toString(),
            authors: [],
            length: course.duration
        }).subscribe(
            () => this.toastr.success('Course created successfully!'),
            (httpError: HttpErrorResponse) => this.toastr.error(`${httpError.status} ${httpError.statusText}`)
        );
        this._courses.push(course);
    }

    public getCourseById(id: number): TNullable<Course> {
        return this._courses.find(
            (course: Course) => course.id === id
        );
    }

    public updateCourse(config: ICourse): void {
        this.http.put(`${this._baseURL}/courses/` + config.id, {
            id: config.id,
            name: config.title,
            description: config.description,
            isTopRated: config.isTopRated,
            date: config.creationDate.toString(),
            authors: [],
            length: config.duration
        }).subscribe(
            () => this.toastr.success('Course updated successfully!'),
            (httpError: HttpErrorResponse) => this.toastr.error(`${httpError.status} ${httpError.statusText}`)
        );
        const index = this.findCourseIndex(config);
        this._courses.splice(index, 1, new Course(config.id, config.title, config.creationDate.toString(), config.duration,
            config.description, config.isTopRated));
    }

    public searchCourses(searchText: string): Observable<Course[]> {
        if (searchText !== '') {
            return this.getCourses(`/courses?search=${searchText}`).pipe(
                catchError(
                    (httpError: HttpErrorResponse) => {
                        this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                        return of([]);
                    }
                )
            );
        } else {
            return this.getAllCourses();
        }
    }

    public removeCourse(course: Course): Observable<object> {
        this._courses.splice(this.findCourseIndex(course), 1);
        return this.http.delete(`${this._baseURL}/courses/${course.id}`);
    }

    private findCourseIndex(course: ICourse): number {
        return this._courses.findIndex(
            (item: Course) => course.id === item.id
        );
    }

    private getCourses(url: string = `/courses?start=0&count=${amountCoursesInPage}`): Observable<Course[]> {
        return this.http.get<Course[]>(this._baseURL + url).pipe(
            map((data: Course[]) => {
                let courses = data.map(
                    (course: ICourse) => new Course(course.id, course.name, course.date, course.length,
                        course.description, course.isTopRated)
                );
                if (url.includes('search')) {
/* tslint:disable */
// 16 is start char position of searchText in URL /courses?search=searchText
                    const searchText = url.slice(16)
/* tslint:enable */
                    courses = courses.filter( (item: Course) =>
                        item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 ||
                        item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0
                    );
                }
                this._courses = this._courses.concat(courses);
                return courses;
            }),
            catchError(
                (httpError: HttpErrorResponse) => {
                    this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                    return of([]);
                }
            )
        );
    }
}
