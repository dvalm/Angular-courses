import { CourseComponent } from '../components/course-list/course/course.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HourglassDirective } from './hourglass.directive';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course';

@Pipe({name: 'appDuration'})
class DurationPipeStub implements PipeTransform {
    transform(value: number): number {
        return value;
    }
}

describe('HourglassDirective', () => {
    let fixture: ComponentFixture<CourseComponent>;
    let comp: CourseComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseComponent,
          DurationPipeStub,
          HourglassDirective
        ],
        schemas: [
            NO_ERRORS_SCHEMA
        ]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(CourseComponent);
        comp = fixture.componentInstance;
      });
    }));

    it('should appear hourglass on course that duration 94min', () => {
        comp.course = new Course(null, null, null, 94);
        fixture.detectChanges();
        const div =  fixture.nativeElement.querySelector('.course__hourglass');
        expect(div).not.toBeNull();
    });

    it('should appear hourglass on course that duration 90min', () => {
        comp.course = new Course(null, null, null, 90);
        fixture.detectChanges();
        const div =  fixture.nativeElement.querySelector('.course__hourglass');
        expect(div).not.toBeNull();
    });

    it('should appear hourglass on course that duration 60min', () => {
        comp.course = new Course(null, null, null, 60);
        fixture.detectChanges();
        const div =  fixture.nativeElement.querySelector('.course__hourglass');
        expect(div).toBeNull();
    });
});
