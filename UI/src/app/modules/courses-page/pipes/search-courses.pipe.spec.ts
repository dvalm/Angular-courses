import { SearchCoursesPipe } from './search-courses.pipe';
import { Course } from '../models/course';

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

const searchCoursesPipe = new SearchCoursesPipe();

describe('SearchCoursesPipe', () => {

    it('transforms courses[] with search text "aaaa" and get 0 courses', () => {
        expect(searchCoursesPipe.transform(courses, 'aaaa')).toEqual([]);
    });

    it('transforms courses[] with search text "si" and get 1 course', () => {
/* tslint:disable */
    // 1 and 2 are numbers elements in courses[]
        expect(searchCoursesPipe.transform(courses, 'si')).toEqual([courses[1], courses[2]]);
/* tslint:enable */
    });

    it('transforms courses[] with search text "re" and get 3 courses', () => {
/* tslint:disable */
    // 0, 3, 4 are numbers elements in courses[]
        const expectedCourses = [].concat(courses[0], courses[2], courses[3], courses[4]);
/* tslint:enable */
        expect(searchCoursesPipe.transform(courses, 're')).toEqual(expectedCourses);
    });

    it('transforms courses[] with search text "li" and get 2 courses', () => {
/* tslint:disable */
    // 0 and 3 are numbers elements in courses[]
        const expectedCourses = [].concat(courses[0], courses[3]);
/* tslint:enable */
        expect(searchCoursesPipe.transform(courses, 'li')).toEqual(expectedCourses);
    });
});
