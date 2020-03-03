import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { Course } from '../../models/course';
import { CourseListComponent } from './course-list.component';
import { CoursesOrderByPipe } from '../../pipes/courses-order-by.pipe';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { CoursesServiceStub } from 'src/app/modules/shared/testing-stub/courses-service-stub.mock';

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
    component.ngOnDestroy();
    fixture.destroy();
  });

  it('should get and sort course list in OnInit()', () => {
    component.ngOnInit();
/* tslint:disable */
    // 2, 0, 1, 4 and 3 are numbers of elements in allCourses[]
    const sortedCourses = [allCourses[2], allCourses[0], allCourses[1], allCourses[4], allCourses[3]];
/* tslint:enable */
    expect(component.sortedCourses).toEqual(sortedCourses);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update courses visability in changeSearchText()', () => {
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
    expect(component.sortedCourses).toEqual([]);
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'mollit\'', () => {
    component.ngOnInit();
    component.changeSearchText('mollit');
/* tslint:disable */
// 0 and 3  are numbers of element with text "mollit"  in allCourses[]
    expect(component.sortedCourses).toEqual([allCourses[0], allCourses[3]]);
/* tslint:enable */
  });

  it('should update courses visability with oreder by parametr - \'creationDate\' and searchText=\'\'', () => {
    component.ngOnInit();
    component.changeSearchText('');
/* tslint:disable */
    // 2, 0, 1, 4 and 3 are numbers of elements in allCourses[]
    const sortedCourses = [allCourses[2], allCourses[0], allCourses[1], allCourses[4], allCourses[3]];
/* tslint:enable */
    expect(component.sortedCourses).toEqual(sortedCourses);
  });

  it('should load courses in loadMore()', () => {
    component.ngOnInit();
    component.loadMore();
    spyOn(component, 'updateCourseVisability');
    component.updateCourseVisability(component.sortedCourses);
    expect(component.updateCourseVisability).toHaveBeenCalled();
/* tslint:disable */
// 2, 0, 1, 4 and 3 are numbers of elements in allCourses[]
    const loadingCourses = [allCourses[2], allCourses[2], allCourses[0], allCourses[0],
      allCourses[1], allCourses[1], allCourses[4], allCourses[4], allCourses[3], allCourses[3]];
/* tslint:enable */
    expect(component.sortedCourses).toEqual(loadingCourses);
  });
});
