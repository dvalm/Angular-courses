import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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

    constructor(private fb: FormBuilder) {}

    public ngOnInit(): void {
      if (this.course) {
        this.course = new Course(null, '', '', null, '', false);
      }
      this.courseDescription = this.fb.group({
        title: [this.course.title],
        description: [this.course.description],
        date: [],
        duration: []
      });
    }

    public back(): void {
        this.changePage.emit();
    }
  }
