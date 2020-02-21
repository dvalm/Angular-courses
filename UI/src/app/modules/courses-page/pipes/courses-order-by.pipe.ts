import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Pipe({
  name: 'appCoursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {
  public transform(courses: Course[], parameter: keyof Course): Course[] {
    if (courses.length) {
      if (courses[0][parameter] instanceof Date) {
        return courses.sort((prev: Course, next: Course) => {
          return (next[parameter] as Date).getTime() - (prev[parameter] as Date).getTime();
        });
      } else if (courses[0][parameter] instanceof Number) {
        return courses.sort((prev: Course, next: Course) => {
          return (prev[parameter] as number) - (next[parameter] as number);
        });
      } else if (courses[0][parameter] instanceof Boolean) {
        return courses.sort((prev: Course, next: Course) => {
          return prev[parameter] < next[parameter] ? 1 : -1;
        });
      } else {
        return courses.sort((prev: Course, next: Course) => {
          return prev[parameter] > next[parameter] ? 1 : -1;
        });
      }
    } else {
      return [];
    }
  }
}
