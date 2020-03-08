import { Action } from '@ngrx/store';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from 'src/app/modules/courses-page/interfaces/courses';

export enum CoursesActionsType {
    getAllCourses = '[Courses] get all courses',
    setCourses = '[Courses] set course list',
    createCourse = '[Courses] create course',
    createCourseSuccess = '[Courses] create course success',
    createCourseError = '[Courses] create course error',
    updateCourse = '[Courses] update course',
    updateCourseSuccess = '[Courses] update course success',
    updateCourseError = '[Courses] update course error',
    removeCourse = '[Courses] remove course',
    removeCourseSuccess = '[Courses] remove course success',
    removeCourseError = '[Courses] remove course error',
    loadCourses = '[Courses] load courses and add in course list',
}
/* tslint:disable:max-classes-per-file */
export class GetAllCoursesAction implements Action {
    readonly type = CoursesActionsType.getAllCourses;
    constructor() {}
}

export class SetCoursesAction implements Action {
    readonly type = CoursesActionsType.setCourses;
    constructor (public payload: {courses: Course[]}) {}
}

export class CreateCourseAction implements Action {
    readonly type = CoursesActionsType.createCourse;
    constructor (public payload: {course: Course}) {}
}

export class CreateCourseSuccessAction implements Action {
    readonly type = CoursesActionsType.createCourseSuccess;
    constructor (public payload: {course: Course}) {}
}

export class CreateCourseErrorAction implements Action {
    readonly type = CoursesActionsType.createCourseError;
    constructor () {}
}

export class UpdateCourseAction implements Action {
    readonly type = CoursesActionsType.updateCourse;
    constructor (public payload: {course: ICourse}) {}
}

export class UpdateCourseSuccessAction implements Action {
    readonly type = CoursesActionsType.updateCourseSuccess;
    constructor (public payload: {course: Course}) {}
}

export class UpdateCourseErrorAction implements Action {
    readonly type = CoursesActionsType.updateCourseError;
    constructor () {}
}

export class RemoveCourseAction implements Action {
    readonly type = CoursesActionsType.removeCourse;
    constructor (public payload: {course: Course}) {}
}

export class RemoveCourseSuccessAction implements Action {
    readonly type = CoursesActionsType.removeCourseSuccess;
    constructor (public payload: {course: Course}) {}
}

export class RemoveCourseErrorAction implements Action {
    readonly type = CoursesActionsType.removeCourseError;
    constructor () {}
}

export class LoadCoursesAction implements Action {
    readonly type = CoursesActionsType.loadCourses;
    constructor (public payload: {courses: Course[]}) {}
}
/* tslint:enable:max-classes-per-file */
export type CoursesAction = GetAllCoursesAction
    | SetCoursesAction
    | CreateCourseAction
    | CreateCourseSuccessAction
    | CreateCourseErrorAction
    | UpdateCourseAction
    | UpdateCourseSuccessAction
    | UpdateCourseErrorAction
    | RemoveCourseAction
    | RemoveCourseSuccessAction
    | RemoveCourseErrorAction
    | LoadCoursesAction;
