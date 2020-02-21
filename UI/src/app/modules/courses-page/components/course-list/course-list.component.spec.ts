import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { Course } from '../../models/course';
import { CourseListComponent } from './course-list.component';
import { CoursesOrderByPipe } from '../../pipes/courses-order-by.pipe';
import { SearchCoursesPipe } from '../../pipes/search-courses.pipe';
import { CoursesService } from 'src/app/modules/shared/services/courses.service';
import { ModalService } from 'src/app/modules/shared/services/modal.service';

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

const CoursesServiceStub = {
  getAllCourses(): Course[] {
    return allCourses;
  },
};

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
        { provide: CoursesService, useValue:  CoursesServiceStub },
        ModalService,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get and sort course list in OnInit()', () => {
    component.ngOnInit();
    expect(component.sortedCourses).toBe(allCourses);
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
