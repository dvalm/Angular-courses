import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from 'src/app/modules/courses-page/models/course';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseComponent {

    @Input() course: Course;
    @Output() deleteCourse:  EventEmitter<Course> = new EventEmitter<Course>();

    public delete(): void {
      this.deleteCourse.emit(this.course);
    }
  }
