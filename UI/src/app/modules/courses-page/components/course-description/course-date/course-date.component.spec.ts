import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CourseDateComponent } from './course-date.component';
import { FormGroup } from '@angular/forms';

describe('CourseDateComponent', () => {
    let component: CourseDateComponent;
    let fixture: ComponentFixture<CourseDateComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseDateComponent,
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseDateComponent);
      component = fixture.componentInstance;
    });

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
});
