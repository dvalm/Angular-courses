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
    courses.filter(function(item, index, array){
      return item.title.indexOf(searchText) >= 0;
    });
    //console.log(courses);
    return courses.slice(); 
  }
}