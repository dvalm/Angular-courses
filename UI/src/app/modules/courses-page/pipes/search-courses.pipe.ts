import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Pipe({
  name: 'appSearchCourses',
})
export class SearchCoursesPipe implements PipeTransform {
  public transform(courses: Course[], searchText?: string): Course[] {
    if (!searchText) {
        return courses;
    }
    return courses.filter( (item: Course) =>
      item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 ||
        item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0
    );
  }
}
