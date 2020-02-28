import { Injectable, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../../courses-page/interfaces/courses';
import { TNullable } from '../../courses-page/types/nullable.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    public courses: Course[] = [];
    private baseURL = 'http://localhost:3004';

    constructor(private http: HttpClient) {}

    public getAllCourses(): Observable<Course[]> {
        return this.getCourses(`/courses?start=0&count=6`);
    }

    public loadCourses(): Observable<Course[]> {
        return this.getCourses(`/courses?start=${this.courses.length}&count=6`);
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
        }).subscribe();
    }

    public getCourseById(id: number): TNullable<Course> {
        return this.courses.find(
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
        }).subscribe();
    }

    public searchCourses(searchText: string): Observable<Course[]> {
        return this.getCourses(`/courses?search=${searchText}`);
    }

    public removeCourse(course: Course): void {
        this.http.delete(`${this.baseURL}/courses/${course.id}`).subscribe();
    }

    private getCourses(url: string = '/courses?start=0&count=6'): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseURL + url).pipe(
            map((data: Course[]) => {
                this.courses = data.map( (course: ICourse) => {
                    return new Course(course.id, course.name, course.date, course.length, course.description, course.isTopRated);
                });
                return this.courses;
            })
        );
    }
}
