import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CourseComponent } from '../components/course-list/course/course.component';
import { CoursePlateBorderDirective } from './course-plate-border.directive';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, Input, Directive } from '@angular/core';
import { Course } from '../models/course';

const green = 'rgb(217, 228, 106)';
const blue = 'rgb(152, 225, 234)';

@Directive({
    selector: '[hourglass]'
})
class StubHourglassDirective {
    @Input() set hourglass(duration: number) {}
}

@Pipe({name: 'appDuration'})
/* tslint:disable */
//  class StubHourglassDirective and class DurationPipeStub are need
class DurationPipeStub implements PipeTransform {
/* tslint:enable */
    transform(value: number): number {
        return value;
    }
}

describe('CoursePlateBorderDirective', () => {
    let fixture: ComponentFixture<CourseComponent>;
    let comp: CourseComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CoursePlateBorderDirective,
          CourseComponent,
          DurationPipeStub,
          StubHourglassDirective
        ],
        schemas: [
            NO_ERRORS_SCHEMA
        ]
      }).compileComponents().then(() => {
        fixture = TestBed.createComponent(CourseComponent);
        comp = fixture.componentInstance;
      });
    }));

    it('should appear left green border on course', () => {
      const nowDate = new Date();
/* tslint:disable */
    // 7 day in one week
      const date = new Date((nowDate).setDate(nowDate.getDate() - 7));
/* tslint:enable */
      comp.course = new Course(null, null, date.toString());
      fixture.detectChanges();
      const div =  fixture.nativeElement.querySelector('.course');
      expect(div.style.borderLeft).toBe(`3px solid ${green}`);
      expect(div.style.paddingLeft).toBe('7px');
    });

    it('should appear left blue border on course', () => {
        const nowDate = new Date();
/* tslint:disable */
    // 7 day in one week
        const date = new Date((nowDate).setDate(nowDate.getDate() + 7));
/* tslint:enable */
        comp.course = new Course(null, null, date.toString());
        fixture.detectChanges();
        const div =  fixture.nativeElement.querySelector('.course');
        expect(div.style.borderLeft).toBe(`3px solid ${blue}`);
        expect(div.style.paddingLeft).toBe('7px');
    });

    it('shouldn\'t appear border on course', () => {
        const nowDate = new Date();
/* tslint:disable */
    // 15 day > two week
        const date = new Date((nowDate).setDate(nowDate.getDate() - 15));
/* tslint:enable */
        comp.course = new Course(null, null, date.toString());
        fixture.detectChanges();
        const div =  fixture.nativeElement.querySelector('.course');
        expect(div.style.borderLeft).toBe('');
    });
});
