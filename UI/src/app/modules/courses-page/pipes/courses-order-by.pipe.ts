import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Pipe({
  name: 'appCoursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {
  public transform(courses: Course[], parameter: keyof Course): Course[] {
    let sortedCourses: Course[] = [];
    courses.forEach( (item: Course) => {
      let n = 0;
      if (sortedCourses.length !== 0 && item[parameter] > sortedCourses[0][parameter]) {
          sortedCourses.forEach((sortedIitem: Course, sortedI: number, sortedCourses: Course[]) => {
              if (item[parameter] >= sortedIitem[parameter] &&
                (sortedCourses.length === sortedI + 1 || item[parameter] < sortedCourses[sortedI + 1][parameter])) {
                  n = sortedI + 1;
              }
          });
      }
      sortedCourses.splice(n, 0, item);
    });
    return sortedCourses;
  }
}
