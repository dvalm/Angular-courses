import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Pipe({
  name: 'appCoursesOrderBy'
})
export class CoursesOrderByPipe implements PipeTransform {
  public transform(courses: Course[], parameter: keyof Course): Course[] {
    return courses.sort((prev: Course, next: Course) => {
      if (prev[parameter] > next[parameter]) { return 1; }
      if (prev[parameter] === next[parameter]) { return 0; }
      if (prev[parameter] < next[parameter]) { return -1; }
    });
  }
}
