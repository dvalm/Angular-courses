import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoursesService } from './courses.service';
import { Course } from '../../courses-page/models/course';
import { RouterStub } from '../testing-stub/router-stub';

const routerStub = new RouterStub();
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
        { provide: Router, useValue: routerStub },
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
    expect(service.getCourseById(1)).toEqual(service.courses[0]);
  });

  it('should call getCourseById(incorrectValue) and retun any course', () => {
    service.courses = courses.slice();
    expect(service.getCourseById(0)).toBeUndefined();
  });

  it('should call updateCourse(config: ICourse) and update courses', () => {
    service.courses = courses.slice();
    const config = {id: 1, title: 'newTitle', description: 'newDescription', isTopRated: true};
    const allCourses = courses.slice();
    Object.assign(allCourses[0], config);
    service.updateCourse(config);
    expect(service.courses).toEqual(allCourses.slice());
  });

  it('should call removeCourse(course: Course) and update courses', () => {
    service.courses = courses.slice();
/* tslint:disable */
    // 2 is the id of course[4]
    const course = service.getCourseById(2);
/* tslint:enable */
    service.removeCourse(course);
    const allCourses = courses.slice();
/* tslint:disable */
    // 4 is the position of remove element and 1 is the count of elements
    allCourses.splice(4, 1);
/* tslint:enable */
    expect(service.courses).toEqual(allCourses);
  });

  it('should call removeCourse(course: Course) and update courses', () => {
    service.courses = courses.slice();
/* tslint:disable */
    // 3 is the id of course[2]
    const course = service.getCourseById(3);
/* tslint:enable */
    service.removeCourse(course);
    const allCourses = courses.slice();
/* tslint:disable */
    // 2 is the position of remove element and 1 is the count of elements
    allCourses.splice(2, 1);
/* tslint:enable */
    expect(service.courses).toEqual(allCourses);
  });
});
