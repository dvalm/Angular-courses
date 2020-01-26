import { Pipe, PipeTransform } from '@angular/core';
import { Course } from "src/app/modules/courses-page/models/course"

@Pipe({
  name: 'appSearchCourses'
})
export class SearchCoursesPipe implements PipeTransform {
  public transform(courses: Course[], searchText?: string): Course[] {
    if(!searchText){
        return courses;
    }
    let filtredCourses: Course[] = [];
    // courses.filter(function(item, index, array){
    //   return item.title.indexOf(searchText) >= 0
    // });
    courses.forEach(function(item, i, arr) {
        item.title.indexOf(searchText) >= 0 ? filtredCourses.push(item) : false ;
    });
    return filtredCourses; 
  }
}