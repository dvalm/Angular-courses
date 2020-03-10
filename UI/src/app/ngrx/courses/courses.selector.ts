import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICoursesState } from './courses.state';
import { COURSES_REDUSER_NODE } from './courses.reduser';
import { Course } from 'src/app/modules/courses-page/models/course';
import { TNullable } from 'src/app/modules/courses-page/types/nullable.type';
import { IPropsId } from 'src/app/modules/shared/interfaces/props-id';

export const coursesFeaturesSelector = createFeatureSelector<ICoursesState>(COURSES_REDUSER_NODE);

export const coursesSelector = createSelector(
    coursesFeaturesSelector,
    (state: ICoursesState): Course[] => state.courses
);

export const getCourseByIdSelector = createSelector(
    coursesFeaturesSelector,
    (state: ICoursesState, props: IPropsId): TNullable<Course> => {
        return state.courses.find((item: Course) => item.id === props.id) || null;
    }
);
