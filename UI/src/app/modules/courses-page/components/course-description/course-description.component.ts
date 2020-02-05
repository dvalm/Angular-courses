import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../../interfaces/courses';

@Component({
    selector: 'app-course-description',
    templateUrl: './course-description.component.html',
    styleUrls: ['./course-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CoursesDescriptionComponent implements OnInit {

    @Output() changePage:  EventEmitter<void> = new EventEmitter();
    @Input() course: Course;
    public courseDescription: FormGroup;

    constructor(private fb: FormBuilder,
                private datePipe: DatePipe,
                private coursesService: CoursesService) {}

    public ngOnInit(): void {
      if (!this.course) {
        this.courseDescription = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          duration: ['', Validators.required],
          date: ['', Validators.required],
          isTopRated: [false]
        });
      } else {
        this.courseDescription = this.fb.group({
          title: [this.course.title, Validators.required],
          description: [this.course.description, Validators.required],
          creationDate: [this.datePipe.transform(this.course.creationDate, 'dd/MM/yyyy'), Validators.required],
          duration: [this.course.duration, Validators.required],
          isTopRated: [this.course.isTopRated]
        });
      }
    }

    public back(): void {
        this.changePage.emit();
    }

    public save(): void {
      const course: ICourse = this.courseDescription.value;
/* tslint:disable */
      course.creationDate = new Date(parseInt(course.date.slice(6)), parseInt(course.date.slice(3,5))-1, parseInt(course.date.slice(0,2)));
/* tslint:enable */
      if (this.course) {
        course.id = this.course.id;
        this.coursesService.updateCourse(course);
      } else {
/* tslint:disable */
        let id = parseInt(Math.random().toFixed(7).slice(2));
/* tslint:enable */
        this.coursesService.createCourse(new Course(id, course.title, course.creationDate.toString(),
                                         course.duration, course.description, course.isTopRated));
      }
      this.back();
    }
  }
