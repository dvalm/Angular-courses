import { SearchCoursesPipe } from './search-courses.pipe';
import { Course } from '../models/course';

const courses = [
    new Course(null, 'duis mollit reprehenderit ad'),
    new Course(null, 'magna excepteur aute deserunt'),
    new Course(null, 'sit voluptate eiusmod ea'),
    new Course(null, 'reprehenderit est veniam elit'),
    new Course(null, 'reprehenderit eiusmod nostrud amet'),
];

const searchCoursesPipe = new SearchCoursesPipe();

describe('SearchCoursesPipe', () => {

    it('transforms courses[] with search text "aaaa" and get 0 courses', () => {
        expect(searchCoursesPipe.transform(courses, 'aaaa')).toEqual([]);
    });

    it('transforms courses[] with search text "si" and get 1 course', () => {
/* tslint:disable */
    // 2 is number element in courses[]
        expect(searchCoursesPipe.transform(courses, 'si')).toEqual([courses[2]]);
/* tslint:enable */
    });

    it('transforms courses[] with search text "re" and get 3 courses', () => {
/* tslint:disable */
    // 0, 3, 4 are numbers elements in courses[]
        const expectedCourses = [].concat(courses[0], courses[3], courses[4]);
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
