import { TestBed, async, getTestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CoursesService } from './courses.service';
import { Course } from '../../courses-page/models/course';
import { RouterStub } from '../testing-stub/router-stub.mock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICourse } from '../../courses-page/interfaces/courses';

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
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:  [
        CoursesService,
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
    service.getAllCourses().subscribe(
      (allCourses: Course[]) => expect(allCourses).toEqual(courses.slice())
    );
    const req = httpTestingController.expectOne('http://localhost:3004/courses?start=0&count=6');
    expect(req.request.method).toBe('GET');
    req.flush(JSON.stringify(courses));
  }));
});
