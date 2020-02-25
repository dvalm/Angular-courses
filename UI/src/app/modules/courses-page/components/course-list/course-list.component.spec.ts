import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { Course } from '../../models/course';
import { CourseListComponent } from './course-list.component';
import { CoursesOrderByPipe } from '../../pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from '../../pipes/search-courses.pipe';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { CoursesServiceStub } from 'src/app/modules/shared/testing-stub/courses-service-stub';

const allCourses = [
/* tslint:disable */
    // all number are randon
  new Course(1, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true),
  new Course(5, 'magna excepteur aute deserunt', '2020-01-19T02:02:36+00:00', 7, 'sit voluptate eiusmod ea', true),
  new Course(3, 'sit voluptate eiusmod ea', '2020-07-03T12:57:37+00:00', 654, 'reprehenderit eiusmod nostrud amet', false),
  new Course(77, 'reprehenderit est veniam elit', '2018-03-18T06:36:07+00:00', 55, 'duis mollit reprehenderit ad', false),
  new Course(2, 'reprehenderit eiusmod nostrud amet', '2019-01-18T19:10:51+00:00', 120, 'magna excepteur aute deserunt', true),
/* tslint:enable */
];

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
        SearchCoursesPipe,
        { provide: CoursesService, useValue:  new CoursesServiceStub() },
        { provide: ModalService, useValue: {} }
      ],
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
/* tslint:disable */
    // 2, 0, 1, 4 and 3 are numbers of elements in allCourses[]
    const sortedCourses = [allCourses[2], allCourses[0], allCourses[1], allCourses[4], allCourses[3]];
/* tslint:enable */
    expect(component.sortedCourses).toEqual(sortedCourses);
  });

  it('should update sourses visability in OnChanges()', () => {
    const comp = new CourseListComponent(new CoursesOrderByPipe(),
      new SearchCoursesPipe(), null, null, null);
    spyOn(comp, 'ngOnChanges');
    comp.ngOnChanges(null);
    expect(comp.ngOnChanges).toHaveBeenCalled();
    spyOn(comp, 'updateCourseVisability');
    comp.updateCourseVisability();
    expect(comp.updateCourseVisability).toHaveBeenCalled();
  });

  it('should update sourses visability in changeSearchText()', () => {
    const comp = new CourseListComponent(new CoursesOrderByPipe(),
      new SearchCoursesPipe(), null, null, null);
    spyOn(comp, 'changeSearchText');
    comp.changeSearchText('text');
    expect(comp.changeSearchText).toHaveBeenCalled();
    spyOn(comp, 'updateCourseVisability');
    comp.updateCourseVisability();
    expect(comp.updateCourseVisability).toHaveBeenCalled();
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'aaa\'' +
    +'in updateCourseVisability()', () => {
    component.ngOnInit();
    component.changeSearchText('aaa');
    component.updateCourseVisability();
    let courses = (new CoursesOrderByPipe()).transform(allCourses.slice(), 'creationDate');
    courses = (new SearchCoursesPipe()).transform(courses, 'aaa');
    expect(component.sortedCourses.slice()).toEqual(courses);
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'\' in updateCourseVisability()', () => {
    component.ngOnInit();
    component.changeSearchText('');
    component.updateCourseVisability();
    let courses = (new CoursesOrderByPipe()).transform(allCourses.slice(), 'creationDate');
    courses = (new SearchCoursesPipe()).transform(courses, '');
    expect(component.sortedCourses).toEqual(courses);
  });

  it('should update courses visability with oreder by parametr - \'id\' and searchText=\'re\' in updateCourseVisability()', () => {
    component.ngOnInit();
    component.changeSearchText('re');
    component.updateCourseVisability();
    let courses = (new CoursesOrderByPipe()).transform(allCourses.slice(), 'id');
    courses = (new SearchCoursesPipe()).transform(courses, 're');
    expect(component.sortedCourses).toEqual(courses);
  });
});
