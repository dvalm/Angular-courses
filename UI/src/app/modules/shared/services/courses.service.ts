import { Injectable, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../../courses-page/interfaces/courses';
import { TNullable } from '../../courses-page/types/nullable.type';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SearchCoursesPipe } from '../../courses-page/pipes/search-courses.pipe';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public courses: BehaviorSubject<Course[]>  = new BehaviorSubject<Course[]>([]);
    private _courses: Course[] = [];
    private baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient,
                private toastr: ToastrService) {}

    public getAllCourses(): void {
        this.getCourses(`/courses?start=0&count=6`).subscribe(
            (courses: Course[]) => {
                this.courses.next(courses);
                this._courses = courses;
            },
            () => this.toastr.error('Internal Server Error')
        );
    }

    public loadCourses(): void {
        this.getCourses(`/courses?start=${this._courses.length}&count=6`).subscribe(
            (courses: Course[]) => {
                this._courses = this._courses.concat(courses);
                this.courses.next(this._courses);
            },
            () => this.toastr.error('Internal Server Error')
        );
    }

    public createCourse(course: Course): void {
        this.http.post(`${this.baseURL}/courses/`, {
            id: course.id,
            name: course.title,
            description: course.description,
            isTopRated: course.isTopRated,
            date: course.creationDate.toString(),
            authors: [],
            length: course.duration
        }).subscribe(
            () => {},
            () => this.toastr.error('Internal Server Error')
        );
    }

    public getCourseById(id: number): TNullable<Course> {
        return this._courses.find(
            (course: Course) => course.id === id
        );
    }

    public updateCourse(config: ICourse): void {
        const course = this.getCourseById(config.id);
        this.http.put(`${this.baseURL}/courses/` + course.id, {
            id: course.id,
            name: course.title,
            description: course.description,
            isTopRated: course.isTopRated,
            date: course.creationDate.toString(),
            authors: [],
            length: course.duration
        }).subscribe(
            () => {},
            () => this.toastr.error('Internal Server Error')
        );
    }

    public searchCourses(searchText: string): void {
        if (searchText !== '') {
            this.getCourses(`/courses?search=${searchText}`).subscribe(
                (courses: Course[]) => {
                    this.courses.next(courses);
                    this._courses = courses;
                },
                () => this.toastr.error('Internal Server Error')
            );
        } else {
            this.getAllCourses();
        }
    }

    public removeCourse(course: Course): void {
        this.http.delete(`${this.baseURL}/courses/${course.id}`).subscribe(
            () => {
                const index = this._courses.findIndex(
                    (item: Course) => item.id === course.id
                );
                this._courses.splice(index, 1);
                this.courses.next(this._courses);
            },
            () => this.toastr.error('Internal Server Error')
        );
    }

    private getCourses(url: string = '/courses?start=0&count=6'): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseURL + url).pipe(
            map((data: Course[]) => {
                let courses = data.map(
                    (course: ICourse) => new Course(course.id, course.name, course.date, course.length,
                        course.description, course.isTopRated)
                );
                if (!url.includes('search')) {
/* tslint:disable */
// 6 courses should be loaded in one request
                    courses = courses.slice(0, 6);
/* tslint:enable */
                } else {
/* tslint:disable */
// 6 is start char position of searchText in URL /courses?search=searchText
                    const searchText = url.slice(16)
/* tslint:enable */
                    courses = courses.filter( (item: Course) =>
                        item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 ||
                        item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0
                    );
                }
                return courses;
            }),
        );
    }
}
