import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/courses';
import { TNullable } from '../../types/nullable.type';

@Component({
    selector: 'app-course-description',
    templateUrl: './course-description.component.html',
    styleUrls: ['./course-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CoursesDescriptionComponent implements OnInit {

    @Output() changePage:  EventEmitter<void> = new EventEmitter();
    @Input() course: TNullable<Course>;
    public courseDescription: FormGroup;

    constructor(private fb: FormBuilder,
                private datePipe: DatePipe,
                private coursesService: CoursesService) {}

    public ngOnInit(): void {
      const course: Course = this.course || new Course();
      this.setCourseDescripton(course);
    }

    public back(): void {
        this.changePage.emit();
    }

    public submit(): void {
      const course: ICourse = this.courseDescription.value;
      course.creationDate = this.parseDateString(course.date);
      //course.id = this.course.id;
      //this.coursesService.updateCourse(course);
      this.coursesService.createCourse(new Course(course.id, course.title, course.creationDate.toString(),
                                          course.duration, course.description, course.isTopRated));
      this.back();
    }

    private setCourseDescripton(course: Course): void {
      this.courseDescription = this.fb.group({
          title: [course.title, Validators.required],
          description: [course.description, Validators.required],
          date: [this.datePipe.transform(course.creationDate, 'dd/MM/yyyy'), Validators.required],
          duration: [course.duration, Validators.required],
          isTopRated: [course.isTopRated]
      });
    }

    private parseDateString(dateString: string): Date {
/* tslint:disable */
      // 6, 3, 5, 0, 2 are symbol position with we cotout in pattern: dd/mm/yyyy
      const year = parseInt(dateString.slice(6), 10);
      const month =  parseInt(dateString.slice(3,5), 10);
      const day = parseInt(dateString.slice(0,2), 10);
      return new Date(year, month - 1, day);
/* tslint:enable */
    }
}
