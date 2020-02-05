import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-course-date',
    templateUrl: './course-date.component.html',
    styleUrls: ['./course-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDateComponent {
/* tslint:disable */
    @Input('parentForm') formGroup: FormGroup;
    @Input('courseFormControlName') formControlName: string;
/* tslint:enable */

/* tslint:disable */
    public inputValidator(event: any): void {
/* tslint:enable */
        event.target.value = event.target.value.replace(/[\.\,]$/g, '/');
        event.target.value = event.target.value.replace(/(?<=^.)\//g, '');
        event.target.value = event.target.value.replace(/(?<=^.{4})\//g, '');
        event.target.value = event.target.value.replace(/(?<=.{6,})\//g, '');
        event.target.value = event.target.value.replace(/[^0-9.\/]/g, '');
        event.target.value = event.target.value.replace(/^[^0-3]/g, '');
        event.target.value = event.target.value.replace(/(?<=^0)0/g, '');
        event.target.value = event.target.value.replace(/(?<=^3)[^0-1]/g, '');
        event.target.value = event.target.value.replace(/(?<=^[0-9]{2})[0-9]/g, '/');
        event.target.value = event.target.value.replace(/(?<=^.{3})[^0-1]/g, '');
        event.target.value = event.target.value.replace(/(?<=^.{3}0)[0]/g, '');
        event.target.value = event.target.value.replace(/(?<=^.{3}1)[^0-2]/g, '');
        event.target.value = event.target.value.replace(/(?<=^[0-9]{2}\/[0-9]{2})[0-9]/g, '/');
        event.target.value = event.target.value.replace(/(?<=[0-9]{4})[0-9]$/g, '');
        this.formGroup.get(this.formControlName).setValue(event.target.value);
    }
  }
