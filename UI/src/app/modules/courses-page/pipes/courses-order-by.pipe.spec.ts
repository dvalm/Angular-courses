import { Course } from '../models/course';
import { CoursesOrderByPipe } from './courses-order-by.pipe';

const courses = [
    new Course(1, 'duis mollit reprehenderit ad', '2020-01-28T04:39:24+00:00', 67, 'reprehenderit est veniam elit', true),
    new Course(5, 'magna excepteur aute deserunt', '2020-01-19T02:02:36+00:00', 7, 'sit voluptate eiusmod ea', true),
    new Course(3, 'sit voluptate eiusmod ea', '2020-07-03T12:57:37+00:00', 654, 'reprehenderit eiusmod nostrud amet', false),
    new Course(77, 'reprehenderit est veniam elit', '2018-03-18T06:36:07+00:00', 55, 'duis mollit reprehenderit ad', false),
    new Course(2, 'reprehenderit eiusmod nostrud amet', '2019-01-18T19:10:51+00:00', 120, 'magna excepteur aute deserunt', true),
];

const сoursesOrderByPipe = new CoursesOrderByPipe();

describe('CoursesOrderByPipe', () => {

    it('sort courses[] with paremetr "creationDate" ', () => {
        const expectedCourses = [].concat(courses[2], courses[0], courses[1], courses[4], courses[3]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'creationDate')).toEqual(expectedCourses);
    });

    it('sort empty courses[] with paremetr "creationDate" ', () => {
        expect(сoursesOrderByPipe.transform([], 'creationDate')).toEqual([]);
    });

    it('sort courses[] with paremetr "title" ', () => {
        const expectedCourses = [].concat(courses[0], courses[1], courses[4], courses[3], courses[2]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'title')).toEqual(expectedCourses);
    });

    it('sort courses[] with paremetr "duration" ', () => {
        const expectedCourses = [].concat(courses[1], courses[3], courses[0], courses[4], courses[2]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'duration')).toEqual(expectedCourses);
    });

    it('sort courses[] with paremetr "duration" ', () => {
        const expectedCourses = [].concat(courses[1], courses[3], courses[0], courses[4], courses[2]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'duration')).toEqual(expectedCourses);
    });

    it('sort courses[] with paremetr "description" ', () => {
        const expectedCourses = [].concat(courses[3], courses[4], courses[2], courses[0], courses[1]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'description')).toEqual(expectedCourses);
    });

    it('sort courses[] with paremetr "isTopRated" ', () => {
        const expectedCourses = [].concat(courses[3], courses[2], courses[4], courses[1], courses[0]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'isTopRated')).toEqual(expectedCourses);
    });

    it('sort courses[] with paremetr "id" ', () => {
        const expectedCourses = [].concat(courses[0], courses[4], courses[2], courses[1], courses[3]);
        expect(сoursesOrderByPipe.transform(courses.slice(), 'id')).toEqual(expectedCourses);
    });

});
