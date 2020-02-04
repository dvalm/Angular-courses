import { Component, ChangeDetectionStrategy, Input, Attribute, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-course-date',
    templateUrl: './course-date.component.html',
    styleUrls: ['./course-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class CourseDateComponent implements OnInit {
/* tslint:disable */
    @Input('courseFormGroup') formGroup: FormGroup;
    @Input('courseFormControlName') formControlName: string;
/* tslint:enable */
    private _date: string;

    public ngOnInit(): void {
    }

/* tslint:disable */
    public inputValidator(event: any): void {
/* tslint:enable */
        event.target.value = event.target.value.replace(/[\.\,]$/g, '/');
        event.target.value = event.target.value.replace(/[^0-9.\/|\-]/g, '');
        event.target.value = event.target.value.replace(/^[^0-3]/g, '');
        event.target.value = event.target.value.replace(/(?<=^[0-9]{2})[0-9]/g, '/');
        event.target.value = event.target.value.replace(/(?<=^.{3})[^0-1]/g, '');
        event.target.value = event.target.value.replace(/(?<=^.{3}0)[0]/g, '');
        event.target.value = event.target.value.replace(/(?<=^.{3}1)[^0-2]/g, '');
        event.target.value = event.target.value.replace(/(?<=^[0-9]{2}\/[0-9]{2})[0-9]/g, '/');
        event.target.value = event.target.value.replace(/(?<=[0-9]{4})[0-9]$/g, '');
        this.formGroup.get(this.formControlName).setValue(event.target.value);
    }
  }
