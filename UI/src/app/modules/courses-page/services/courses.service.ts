import {Injectable} from '@angular/core';
import data from "src/app/modules/courses-page/models/courses.json";
import { Course } from "src/app/modules/courses-page/models/course"
 
@Injectable()
export class CoursesService{

    public courses: Course[] = [];

    constructor(){
        data.courses.slice(0, 6).forEach( el => {
            this.courses.push(new Course(el.id, el.name, el.date, el.length, el.description, el.isTopRated))
        })
    }

    public getCoursesList(): Course[] {
        return this.courses;
    }

    public createCourse(course: Course): void{
        this.courses.push(course);
    }

    public getCourseById(id: number): Course{
        return this.courses.find(
            course => course.id == id
        );
    }

    public updateCourse(course: Course, newCourse: Course): void{
        let index = this.courses.findIndex( item => item===course );
        for(let key in course){
            if(key!='id' &&  this.courses[index][key]!=newCourse[key]){
                this.courses[index][key]=newCourse[key]
            }
        }
    }

    public removeCourse(course: Course): void{
        let index = this.courses.findIndex( item => item===course );
        this.courses.splice(index, 1);
    }

}