import { Injectable, OnInit } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from '../../courses-page/interfaces/courses';
import { TNullable } from '../../courses-page/types/nullable.type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService{

    public courses: Course[];
    private baseURL = 'http://localhost:3004';
/* tslint:disable */
    // 6 is random number
    private startNumber = 0;
/* tslint:enable */
    constructor(private http: HttpClient) {
        // this.getCourses('/courses').subscribe(
        //     (courses: Course[]) => this.courses = courses
        // );
        console.log("aaaaaaaa", this.courses);
    }

    // public ngOnInit(): void {
    //     this.http.get(this.baseURL+'/courses').pipe( map( (data: Course[]) =>{
    //         this.courses = data;
    //         console.log(data);
    //     })).subscribe();
    // }

    public getAllCourses(): Observable<Course[]> {
        return this.getCourses('/courses?start='+this.startNumber+'&count=6');
    }

    public loadCourses(): Observable<Course[]> {
        this.startNumber += 6;
        return this.getCourses('/courses?start='+this.startNumber+'&count=6');
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

    private getCourses(url: string): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseURL+url).pipe( map( (data: Course[]) =>{
            this.courses = data.map( (course: any) => {
                return new Course(course.id, course.name, course.date, course.length, course.description, course.isTopRated);
            });    
            return data.map( (course: any) => {
                    return new Course(course.id, course.name, course.date, course.length, course.description, course.isTopRated);
                });
            }))
    }
}
