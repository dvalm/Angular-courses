import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-course-duration',
    templateUrl: './course-duration.component.html',
    styleUrls: ['./course-duration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDurationComponent {
/* tslint:disable */
    @Input('parentForm') formGroup: FormGroup;
    @Input('courseFormControlName') formControlName: string;
/* tslint:enable */

/* tslint:disable */
    public inputValidator(event: any): void {
 /* tslint:enable */
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
        this.formGroup.get(this.formControlName).setValue(event.target.value);
    }
  }
