import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-course-date',
    templateUrl: './course-date.component.html',
    styleUrls: ['./course-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDateComponent {

    @Input() parentForm: FormGroup;
    @Input() courseFormControlName: string;
  }
