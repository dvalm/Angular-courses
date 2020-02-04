import { Component, ChangeDetectionStrategy, Input, Attribute, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-course-duration',
    templateUrl: './course-duration.component.html',
    styleUrls: ['./course-duration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDurationComponent implements OnInit {
/* tslint:disable */
    @Input('formGroupName') formGroup: FormGroup;
    @Input('courseFormControlName') formControlName: string;
/* tslint:enable */

    public ngOnInit(): void {}

/* tslint:disable */
    public inputValidator(event: any): void {
 /* tslint:enable */
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.formGroup.get(this.formControlName).setValue(event.target.value);
    }
  }
