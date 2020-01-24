import { Pipe, PipeTransform } from '@angular/core';
import { Course } from "src/app/modules/courses-page/models/course"

@Pipe({
  name: 'appOrderCourseByDate'
})
export class OrderCourseByDatePipe implements PipeTransform {
  public transform(courses: Course[]): Course[] {
    let sortedCourses: Course[] = [];
    courses.forEach(function(item, i, arr) {
        let n: number = 0;
        if(sortedCourses.length!=0){
            sortedCourses.forEach(function(sortedIitem, sortedI, sortedCourses) {
                if( item.creationDate < sortedCourses[0].creationDate) {
                    n = 0;
                }
                if(item.creationDate >= sortedIitem.creationDate &&
                  (sortedCourses.length == sortedI+1 || item.creationDate < sortedCourses[sortedI+1].creationDate)){
                    n = sortedI+1;
                }
            });
        }       
        sortedCourses.splice(n, 0, item);
    });
    return sortedCourses;
  }
}