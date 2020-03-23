import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { Course } from '../../models/course';
import { CourseListComponent } from './course-list.component';
import { CoursesOrderByPipe } from '../../pipes/courses-order-by.pipe';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { CoursesServiceStub } from 'src/app/modules/shared/testing-stub/courses-service-stub.mock';
import { SearchCoursesPipe } from '../../pipes/search-courses.pipe';

const allCourses = [
  new Course(1, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true),
  new Course(5, 'magna excepteur aute deserunt', '2020-01-19T02:02:36+00:00', 7, 'sit voluptate eiusmod ea', true),
  new Course(3, 'sit voluptate eiusmod ea', '2020-07-03T12:57:37+00:00', 654, 'reprehenderit eiusmod nostrud amet', false),
  new Course(77, 'reprehenderit est veniam elit', '2018-03-18T06:36:07+00:00', 55, 'duis mollit reprehenderit ad', false),
  new Course(2, 'reprehenderit eiusmod nostrud amet', '2019-01-18T19:10:51+00:00', 120, 'magna excepteur aute deserunt', true),
];
const coursesServiceStub = new CoursesServiceStub();

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
      ],
      providers: [
        CoursesOrderByPipe,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: ModalService, useValue: {} }
      ],
      imports: [],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and sort course list in OnInit()', () => {
    component.ngOnInit();
    const sortedCourses = [allCourses[2], allCourses[0], allCourses[1], allCourses[4], allCourses[3]];
    expect(component.sortedCourses).toEqual(sortedCourses);
  });

  it('should update sourses visability in changeSearchText()', () => {
    spyOn(component, 'changeSearchText');
    component.changeSearchText('text');
    expect(component.changeSearchText).toHaveBeenCalled();
    spyOn(component, 'updateCourseVisability');
    component.updateCourseVisability(component.sortedCourses);
    expect(component.updateCourseVisability).toHaveBeenCalled();
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'aaa\'', () => {
    component.ngOnInit();
    component.changeSearchText('aaa');
    component.updateCourseVisability(component.sortedCourses);
    let courses = (new CoursesOrderByPipe()).transform(allCourses.slice(), 'creationDate');
    courses = (new SearchCoursesPipe()).transform(courses, 'aaa');
    expect(component.sortedCourses).toEqual(courses);
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'\'', () => {
    component.ngOnInit();
    component.changeSearchText('');
    component.updateCourseVisability(component.sortedCourses);
    let courses = (new CoursesOrderByPipe()).transform(allCourses.slice(), 'creationDate');
    courses = (new SearchCoursesPipe()).transform(courses, '');
    expect(component.sortedCourses).toEqual(courses);
  });
});
