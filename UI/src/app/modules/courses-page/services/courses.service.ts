import { Injectable } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../interfaces/courses';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ICoursesState } from 'src/app/ngrx/courses/courses.state';
import { coursesSelector } from 'src/app/ngrx/courses/courses.selector';
import { Author } from '../models/author';
import { IAuthor } from '../interfaces/author';

const amountCoursesInPage = 6;

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public coursesLength = 0;
    private _baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient,
        private store$: Store<ICoursesState>) { }

    public readAllCourses(): Observable<Course[]> {
        if (this.coursesLength === 0) {
            return this.getCourses(`/courses?start=0&count=${amountCoursesInPage}`);
        } else {
            return this.store$.pipe(select(coursesSelector));
        }
    }

    public loadCourses(): Observable<Course[]> {
        return this.getCourses(`/courses?start=${this.coursesLength}&count=${amountCoursesInPage}`);
    }

    public createCourse(course: Course): Observable<ICourse> {
        const authors = course.authors.map((author: IAuthor) =>
            ({ id: author.id, name: author.firstName, lastName: author.lastName }));
        return this.http.post(`${this._baseURL}/courses/`, {
            id: course.id,
            name: course.title,
            description: course.description,
            isTopRated: course.isTopRated,
            date: course.creationDate.toString(),
            authors: authors,
            length: course.duration
        });
    }

    public updateCourse(config: ICourse): Observable<ICourse> {
        const authors = config.authors.map((author: IAuthor) => {
            return { id: author.id, name: author.firstName, lastName: author.lastName };
        });
        return this.http.put(`${this._baseURL}/courses/` + config.id, {
            id: config.id,
            name: config.title,
            description: config.description,
            isTopRated: config.isTopRated,
            date: config.creationDate.toString(),
            authors: authors,
            length: config.duration
        });
    }

    public searchCourses(searchText: string): Observable<Course[]> {
        if (searchText !== '') {
            return this.getCourses(`/courses?textFragment=${searchText}`);
        } else {
            this.coursesLength = 0;
            return this.readAllCourses();
        }
    }

    public searchAuthors(searchText: string): Observable<Author[]> {
        if (searchText !== '') {
            return this.http.get<Author[]>(this._baseURL + `/authors?textFragment=${searchText}`).pipe(
                map((authors: IAuthor[]) => {
                    return authors.map((author: IAuthor) => {
                        const [firstName, lastName]: string[] = author.name.split(' ');
                        return new Author(author.id, firstName, lastName);
                    });
                })
            );
        } else {
            return of([]);
        }
    }

    public deleteCourse(course: Course): Observable<object> {
        return this.http.delete(`${this._baseURL}/courses/${course.id}`);
    }

    private getCourses(url: string = `/courses?start=0&count=${amountCoursesInPage}`): Observable<Course[]> {
        return this.http.get<Course[]>(this._baseURL + url).pipe(
            map((data: Course[]) => {
                const courses = data.map(
                    (course: ICourse) => {
                        const authors = course.authors.map((author: IAuthor) => new Author(author.id,
                            author.firstName ? author.firstName : author.name, author.lastName));
                        return new Course(course.id, course.name, course.date, course.length,
                            course.description, course.isTopRated, authors);
                    }
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
