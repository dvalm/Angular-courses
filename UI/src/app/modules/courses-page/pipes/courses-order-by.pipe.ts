import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Pipe({
  name: 'appCoursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {
  public transform(courses: Course[], parameter: keyof Course): Course[] {
    if (parameter === ('creationDate')) {
      return courses.sort((prev: Course, next: Course) => {
        return prev[parameter].getTime() - next[parameter].getTime();
      });
    } else if (parameter === ('duration' || 'id')) {
      return courses.sort((prev: Course, next: Course) => {
        return prev[parameter] - next[parameter];
      });
    } else if (parameter === ('isTopRated')) {
      return courses.sort((prev: Course, next: Course) => {
        return prev[parameter] < next[parameter] ? 1 : -1;
      });
    } else {
      return courses.sort((prev: Course, next: Course) => {
        return prev[parameter] > next[parameter] ? 1 : -1;
      });
    }
  }
}
