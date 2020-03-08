import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';
import { COURSES_REDUSER_NODE } from './courses.reduser';
import { Course } from 'src/app/modules/courses-page/models/course';
import { TNullable } from 'src/app/modules/courses-page/types/nullable.type';

export const coursesFeaturesSelector = createFeatureSelector<CoursesState>(COURSES_REDUSER_NODE);

export const coursesSelector = createSelector(
    coursesFeaturesSelector,
    (state: CoursesState): Course[] => state.courses
);

export const getCourseByIdSelector = createSelector(
    coursesFeaturesSelector,
/* tslint:disable */
    (state: CoursesState, props: any): TNullable<Course> => {
/* tslint:enable */
        const course = state.courses.find((item: Course) => {
            return item.id === props.id;
        });
        return course ? course : null;
    }
);
