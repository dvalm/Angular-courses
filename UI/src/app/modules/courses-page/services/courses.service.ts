import { Injectable } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../interfaces/courses';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { CoursesState } from 'src/app/ngrx/courses/courses.state';
import { SetCoursesAction, LoadCoursesAction } from 'src/app/ngrx/courses/courses.action';

/* tslint:disable */
// 6 courses should be loaded in one request and placed on user screen
const amountCoursesInPage = 6;
/* tslint:enable */

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public courseslength = 0;
    private _baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient,
                private toastr: ToastrService,
                private store$: Store<CoursesState>) {}

    public getAllCourses(): void {
        if (this.courseslength === 0) {
            this.getCourses(`/courses?start=0&count=${amountCoursesInPage}`);
        }
    }

    public loadCourses(): void {
        this.getCourses(`/courses?start=${this.courseslength}&count=${amountCoursesInPage}`);
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

    public searchCourses(searchText: string): void {
        if (searchText !== '') {
            this.getCourses(`/courses?search=${searchText}`);
        } else {
            this.getAllCourses();
        }
    }

    public removeCourse(course: Course): Observable<object> {
        return this.http.delete(`${this._baseURL}/courses/${course.id}`);
    }

    private getCourses(url: string = `/courses?start=0&count=${amountCoursesInPage}`): void {
        this.http.get<Course[]>(this._baseURL + url).pipe(
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
                    this.courseslength = courses.length;
                    this.store$.dispatch(new SetCoursesAction({courses: courses}));
                } else {
                    if (url.includes('start=0')) {
                        this.courseslength = courses.length;
                        this.store$.dispatch(new SetCoursesAction({courses: courses}));
                    } else {
                        this.courseslength += courses.length;
                        this.store$.dispatch(new LoadCoursesAction({courses: courses}));
                    }
                }
            })
        ).subscribe(
            () => {},
            (httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
            }
        );
    }
}
