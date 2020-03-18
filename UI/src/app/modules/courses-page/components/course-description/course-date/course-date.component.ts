import { Component, ChangeDetectionStrategy, forwardRef, Input, OnInit, Attribute } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, NG_VALIDATORS, FormControl, Validators } from '@angular/forms';
import { TNullable } from '../../../types/nullable.type';

export function validateDate(formControl: FormControl): TNullable<object> {
  const value = formControl.value;
  const err = {
    error: {
      given: value,
      farmat: 'dd/mm/yyyy'
    }
  };
/* tslint:disable */
// 10 is the number of chars in string "dd/mm/yyyy"
  return /[0-9]{2}[\/\.][0-9]{2}[\/\.][0-9]{4}/.test(value) && value.length === 10 ? null : err;
/* tslint:enable */
}

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateDate,
      multi: true
    }
  ]
})
export class CourseDateComponent implements ControlValueAccessor, OnInit {

  @Input() parentForm: FormGroup;

  constructor(@Attribute('formControlName') public _formControlName: string) {}

  private _value = '';
  public set value(value: string) {
    this._value = value;
    this.onChange(this.value);
  }
  public get value(): string {
    return this._value;
  }

  public ngOnInit(): void {
    this.parentForm.get(this._formControlName).setValidators([Validators.required, validateDate]);
  }

  public writeValue(value: string): void {
    this.value = value;
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
/* tslint:disable */
  private onChange = (_: any) => {};

  private onTouche: any = () => { };
 /* tslint:enable */
}
