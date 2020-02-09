import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-course-duration',
    templateUrl: './course-duration.component.html',
    styleUrls: ['./course-duration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDurationComponent {

    @Input() parentForm: FormGroup;
    @Input() courseFormControlName: string;

    public inputValidator(event: Event): void {
        (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
        this.parentForm.get(this.courseFormControlName).setValue((event.target as HTMLInputElement).value);
    }
  }
