import { Component, ChangeDetectionStrategy, Input, Attribute, forwardRef, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';
import { TNullable } from '../../../types/nullable.type';

export function validateDuration(formControl: FormControl): TNullable<object> {
  const err = {
    error: {
      given: formControl.value,
      farmat: 'Duration must be greater than 0'
    }
  };
  return formControl.value !== 0 && !isNaN(formControl.value) ? null : err;
}

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateDuration,
      multi: true
    }
  ]
})
export class CourseDurationComponent implements ControlValueAccessor, OnInit {

  @Input() parentForm: FormGroup;

  constructor(@Attribute('formControlName') public _formControlName: string) { }

  private _value: string;
  public set value(value: string) {
    this._value = value.replace(/[^0-9]/g, '');
    this.onChange(parseInt(this.value, 10));
  }
  public get value(): string {
    return this._value;
  }

  public ngOnInit(): void {
    this.parentForm.get(this._formControlName).setValidators([Validators.required, validateDuration]);
  }

  public writeValue(value: number): void {
    this.value = value ? value.toString() : '';
  }
/* tslint:disable */
  public registerOnChange(fn: any): void {
 /* tslint:enable */
    this.onChange = fn;
  }
/* tslint:disable */
  public registerOnTouched(fn: any): void {
/* tslint:enable */
    this.onTouche = fn;
  }

  public inputValidator(event: Event): void {
    (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
    this.parentForm.get(this._formControlName).setValue(parseInt((event.target as HTMLInputElement).value, 10));
  }
/* tslint:disable */
  private onChange = (_: any): void => { };

  private onTouche: any = () => { };
 /* tslint:enable */
}
