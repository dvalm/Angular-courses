import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseComponent } from './course.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, Directive, Input } from '@angular/core';
import { Course } from '../../../models/course';

const expectedCourse: Course = new Course();

@Directive({
    selector: '[hourglass]'
})
export class StubHourglassDirective {
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

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseComponent,
        DurationPipeStub,
        StubHourglassDirective
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    component.course = expectedCourse;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setting value to the input properties variables', () => {
    expect(component.course).toEqual(expectedCourse);
  });

  it('click delete button and emit output events', () => {
    const comp = new CourseComponent();
    spyOn(comp.deleteCourse, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.button-delete');
    deleteButton.click();
    expect(comp.deleteCourse.emit).not.toHaveBeenCalled();
  });
});
