import { initialState, CoursesState } from './courses.state';
import { CoursesAction, CoursesActionsType } from './courses.action';
import { Course } from 'src/app/modules/courses-page/models/course';

export const COURSES_REDUSER_NODE = 'courses';

export function coursesReduser(state: CoursesState = initialState, actoin: CoursesAction): CoursesState {
    switch (actoin.type) {
        case CoursesActionsType.setCourses:
            return {
                ...state,
                courses: actoin.payload.courses
            };
        case CoursesActionsType.createCourseSuccess:
            return {
                ...state,
                courses: state.courses.concat(actoin.payload.course)
            };
        case CoursesActionsType.createCourseError:
            return {
                ...state,
                courses: state.courses
            };
        case CoursesActionsType.updateCourseSuccess:
            const updateIndex = state.courses.findIndex(
                (item: Course) => actoin.payload.course.id === item.id
            );
            const updatedCourses = state.courses.slice();
            updatedCourses.splice(updateIndex, 1, actoin.payload.course);
            return {
                ...state,
                courses: updatedCourses
            };
        case CoursesActionsType.updateCourseError:
            return {
                ...state,
                courses: state.courses
            };
        case CoursesActionsType.removeCourseSuccess:
            const removeIndex = state.courses.findIndex(
                (item: Course) => actoin.payload.course.id === item.id
            );
            const removeCourses = state.courses.slice();
            removeCourses.splice(removeIndex, 1);
            return {
                ...state,
                courses: removeCourses
            };
        case CoursesActionsType.removeCourseError:
            return {
                ...state,
                courses: state.courses
            };
        case CoursesActionsType.loadCourses:
            return {
                ...state,
                courses: state.courses.concat(actoin.payload.courses)
            };
        default:
            return state;
    }
}
