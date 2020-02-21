import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoursesService } from './courses.service';
import { Course } from '../../courses-page/models/course';

const router = {
  navigateByUrl: jasmine.createSpy('navigate')
};

const courses = [
/* tslint:disable */
    // all number are randon
  new Course(1, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true),
  new Course(5, 'magna excepteur aute deserunt', '2020-01-19T02:02:36+00:00', 7, 'sit voluptate eiusmod ea', true),
  new Course(3, 'sit voluptate eiusmod ea', '2020-07-03T12:57:37+00:00', 654, 'reprehenderit eiusmod nostrud amet', false),
  new Course(77, 'reprehenderit est veniam elit', '2018-03-18T06:36:07+00:00', 55, 'duis mollit reprehenderit ad', false),
  new Course(2, 'reprehenderit eiusmod nostrud amet', '2019-01-18T19:10:51+00:00', 120, 'magna excepteur aute deserunt', true),
/* tslint:enable */
];

describe('CoursesService', () => {
  let injector: TestBed;
  let service: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:  [
        CoursesService,
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(CoursesService);
  });

  it('should call getAllCourses() and retun course list', () => {
    service.courses = [];
    expect(service.getAllCourses()).toEqual([]);
  });

  it('should call getAllCourses() and retun course list', () => {
    service.courses = courses.slice();
    expect(service.getAllCourses()).toEqual(courses);
  });

  it('should call createCourse(course: Course) and retun course list', () => {
    service.courses = courses.slice();
/* tslint:disable */
    // 23 ad 67 are random numbers
    const course = new Course(23, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true);
/* tslint:enable */
    service.createCourse(course);
    const allCourses = courses.slice();
    allCourses.push(course);
    expect(service.courses).toEqual(allCourses);
  });

  it('should call getCourseById(1) and retun course', () => {
    service.courses = courses.slice();
/* tslint:disable */
    // 1 ad 67 are random numbers
    const course = new Course(1, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true);
/* tslint:enable */
    expect(service.getCourseById(1)).toEqual(course);
  });

  it('should call getCourseById(incorrectValue) and retun any course', () => {
    service.courses = courses.slice();
    expect(service.getCourseById(0)).toBeUndefined();
  });
});
