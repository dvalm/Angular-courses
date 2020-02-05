import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-course-authors',
    templateUrl: './course-authors.component.html',
    styleUrls: ['./course-authors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseAuthorsComponent implements OnInit {
/* tslint:disable */
    @Input('parentForm') formGroup: FormGroup;
    @Input('courseFormControlName') formControlName: string;
/* tslint:enable */

    public ngOnInit(): void {}
  }
