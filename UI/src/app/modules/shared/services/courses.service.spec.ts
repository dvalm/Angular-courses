import { TestBed, async, getTestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoursesService } from './courses.service';
import { Course } from '../../courses-page/models/course';
import { RouterStub } from '../testing-stub/router-stub.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

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

/* tslint:disable */
// 23 ad 67 are random numbers
const course = new Course(3, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true);
/* tslint:enable */

const JSONCourses = [
  {id: 1, name: 'duis mollit reprehenderit ad', description: 'reprehenderit est veniam elit',
    isTopRated: true, date: '2020-01-28T04:39:24+00:00', authors: [], length: 67},
  {id: 5, name: 'magna excepteur aute deserunt', description: 'sit voluptate eiusmod ea',
    isTopRated: true, date: '2020-01-19T02:02:36+00:00', authors: [], length: 7},
  {id: 3, name: 'sit voluptate eiusmod ea', description: 'reprehenderit eiusmod nostrud amet',
    isTopRated: false, date: '2020-07-03T12:57:37+00:00', authors: [], length: 654},
  {id: 77, name: 'reprehenderit est veniam elit', description: 'duis mollit reprehenderit ad',
    isTopRated: false, date: '2018-03-18T06:36:07+00:00', authors: [], length: 55},
  {id: 2, name: 'reprehenderit eiusmod nostrud amet', description: 'magna excepteur aute deserunt',
    isTopRated: true, date: '2019-01-18T19:10:51+00:00', authors: [], length: 120}
];

describe('CoursesService', () => {
  let injector: TestBed;
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:  [
        { provide: ToastrService, useValue: {} },
        { provide: Router, useValue: routerStub },
      ],
      imports: [
        HttpClientTestingModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(
    () => httpTestingController.verify()
  );

  it('should call getAllCourses() and retun course list', async(() => {
    service.getAllCourses();
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    expect(req.request.method).toBe('GET');
    req.flush(JSONCourses);
    service.courses.subscribe(
      (data: Course[]) => expect(data).toEqual(courses)
    );
  }));

  it('should call loadCourse() and add courses', () => {
    service.getAllCourses();
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    req.flush(JSONCourses);
    service.loadCourses();
    const req2 = httpTestingController.expectOne('http://localhost:3004/courses?start=5&count=6');
    expect(req2.request.method).toBe('GET');
    req2.flush(JSONCourses);
    service.courses.subscribe(
      (data: Course[]) => {
        const loadingCourses = courses.concat(courses);
        expect(data).toEqual(loadingCourses);
      }
    );
  });

  it('should call createCourse() and add new Course()', async(() => {
    service.createCourse(course);
    const req = httpTestingController.expectOne('http://localhost:3004/courses/');
    expect(req.request.method).toBe('POST');
    req.flush(JSONCourses);
  }));

  it('should call getCourseById(1) and retun course', () => {
    service.getAllCourses();
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    req.flush(JSONCourses);
    expect(service.getCourseById(1)).toEqual(courses[0]);
  });

  it('should call updateCourse(config: ICourse) and update courses', () => {
    service.getAllCourses();
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    req.flush(JSONCourses);
    const config = {id: 1, title: 'newTitle', description: 'newDescription', isTopRated: true};
    service.updateCourse(config);
    const req2 = httpTestingController.expectOne('http://localhost:3004/courses/1');
    expect(req2.request.method).toBe('PUT');
    req2.flush(config);
  });

  it('should call searchCourses(\'sit\')', () => {
    service.getAllCourses();
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    req.flush(JSONCourses);
    service.searchCourses('sit');
    const req2 = httpTestingController.expectOne('http://localhost:3004/courses?search=sit');
    expect(req2.request.method).toBe('GET');
/* tslint:disable */
// 1 and 2 are numbers of element with text "sit"  in JSONCourses[]
    req2.flush([JSONCourses[1], JSONCourses[2]]);
/* tslint:enable */
    service.courses.subscribe(
/* tslint:disable */
// 1 and 2 are numbers of element with text "sit"  in courses[]
      (data: Course[]) => expect(data).toEqual([courses[1], courses[2]])
/* tslint:enable */
    );
  });

  it('should call removeCourse() and delete this from courses', () => {
    service.getAllCourses();
    const req1 = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    req1.flush(JSONCourses);
    service.removeCourse(course);
    const req = httpTestingController.expectOne('http://localhost:3004/courses/3');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    service.getAllCourses();
    const req3 = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
/* tslint:disable */
// 0, 1, 3, 4 is the number of course in array JSONCourses[] and courses[]
    const coursesAfterDelete = [courses[0], courses[1], courses[3], courses[4]];
    req3.flush([JSONCourses[0], JSONCourses[1], JSONCourses[3], JSONCourses[4]]);
/* tslint:enable */
    service.courses.subscribe(
      (data: Course[]) => expect(data).toEqual(coursesAfterDelete)
    );
  });
});
