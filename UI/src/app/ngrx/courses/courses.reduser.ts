import { initialState, ICoursesState } from './courses.state';
import { CoursesAction, CoursesActionsType } from './courses.action';
import { Course } from 'src/app/modules/courses-page/models/course';

export const COURSES_REDUSER_NODE = 'courses';

export function coursesReduser(state: ICoursesState = initialState, action: CoursesAction): ICoursesState {
    switch (action.type) {
        case CoursesActionsType.readSearchCoursesSuccess:
            return {
                ...state,
                courses: action.payload.courses,
                error: null
            };
        case CoursesActionsType.readSearchCoursesError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        case CoursesActionsType.createCourseSuccess:
            return {
                ...state,
                courses: state.courses.concat(action.payload.course),
                error: null
            };
        case CoursesActionsType.createCourseError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        case CoursesActionsType.updateCourseSuccess:
            const updateIndex = state.courses.findIndex(
                (item: Course) => action.payload.course.id === item.id
            );
            const updatedCourses = state.courses.slice();
            updatedCourses[updateIndex] = { ...action.payload.course };
            return {
                ...state,
                courses: updatedCourses,
                error: null
            };
        case CoursesActionsType.updateCourseError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        case CoursesActionsType.deleteCourseSuccess:
            const filteredCourses = state.courses.filter(
                (course: Course) => course.id !== action.payload.course.id
            );
            return {
                ...state,
                courses: filteredCourses,
                error: null
            };
        case CoursesActionsType.deleteCourseError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        case CoursesActionsType.loadCoursesSuccess:
            return {
                ...state,
                courses: state.courses.concat(action.payload.courses),
                error: null
            };
        case CoursesActionsType.loadCoursesError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        case CoursesActionsType.readAllCoursesSuccess:
            return {
                ...state,
                courses: action.payload.courses,
                error: null
            };
        case CoursesActionsType.readAllCoursesError:
            return {
                ...state,
                courses: state.courses,
                error: action.payload.error
            };
        default:
            return state;
    }
}
