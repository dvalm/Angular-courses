import { Course } from '../../courses-page/models/course';
import { ICourse } from '../../courses-page/interfaces/courses';
import { BehaviorSubject } from 'rxjs';

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

/* tslint:disable */
// 23 ad 67 are random numbers
const course = new Course(3, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true);
/* tslint:enable */

export class CoursesServiceStub {

    public courses: BehaviorSubject<Course[]>  = new BehaviorSubject<Course[]>([]);

    private allCourses = allCourses.slice();

    constructor() {}

    public getCourseById(value: number): Course {
      return course;
    }
    public updateCourse(value: ICourse): void {
/* tslint:disable */
// 2 is the nuber of course in array allCourses[]
        this.allCourses[2] = course;
/* tslint:enable */
    }

    public searchCourses(searchText: string): void {
        if (searchText === '') {
            this.courses.next(allCourses);
        } else {
            const courses = allCourses.slice().filter( (item: Course) =>
            item.title.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 ||
                item.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0);
            this.courses.next(courses);
        }
    }

    getAllCourses(): void {
        this.courses.next(allCourses);
    }

    public isAuthenticated(): boolean {
        return true;
    }

    public loadCourses(): void {
        this.courses.next([...allCourses, ...allCourses]);
    }
}
