import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseDurationComponent } from './course-duration.component';
import { By } from '@angular/platform-browser';

@Pipe({name: 'appDuration'})
class DurationPipeStub implements PipeTransform {
    transform(value: number): number {
        return value;
    }
}
describe('CourseDurationComponent', () => {
    let component: CourseDurationComponent;
    let fixture: ComponentFixture<CourseDurationComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseDurationComponent,
          DurationPipeStub,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
      })
      .compileComponents();
      fixture = TestBed.createComponent(CourseDurationComponent);
      component = fixture.componentInstance;
    }));

    afterEach(() => {
      fixture.destroy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('setting value to the input property \'parentForm\' variables', () => {
      const parentForm = new FormGroup({});
      component.parentForm = parentForm;
      expect(component.parentForm).toEqual(parentForm);
    });

    it('setting value to the input property \'parentForm\' variables', () => {
      const courseFormControlName = 'nameFormControl';
      component.courseFormControlName = courseFormControlName;
      expect(component.courseFormControlName).toEqual(courseFormControlName);
    });

    it('should check entered value \'45a\' in duration input and get corrected value \'45\' in inputValidator()', fakeAsync(() => {
      const courseFormControlName = 'nameFormControl';
      component.courseFormControlName = courseFormControlName;
      component.parentForm =  new FormGroup({
        nameFormControl: new FormControl()
      });
      const inputElement = fixture.debugElement.query(By.css('.course-duration__input'));
      inputElement.nativeElement.value = '45a';
      inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
      expect(inputElement.nativeElement.value).toBe('45');
    }));

    it('should check entered value \'7\' in duration input and get corrected value \'7\' in inputValidator()', fakeAsync(() => {
      const courseFormControlName = 'nameFormControl';
      component.courseFormControlName = courseFormControlName;
      component.parentForm =  new FormGroup({
        nameFormControl: new FormControl()
      });
      const inputElement = fixture.debugElement.query(By.css('.course-duration__input'));
      inputElement.nativeElement.value = '7';
      inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
      expect(inputElement.nativeElement.value).toBe('7');
    }));

    it('should check entered value \'aaa\' in duration input and get corrected value \'\' in inputValidator()', fakeAsync(() => {
      const courseFormControlName = 'nameFormControl';
      component.courseFormControlName = courseFormControlName;
      component.parentForm =  new FormGroup({
        nameFormControl: new FormControl()
      });
      const inputElement = fixture.debugElement.query(By.css('.course-duration__input'));
      inputElement.nativeElement.value = 'aaa';
      inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
      expect(inputElement.nativeElement.value).toBe('');
    }));
});
