import { Action } from '@ngrx/store';
import { Course } from 'src/app/modules/courses-page/models/course';
import { ICourse } from 'src/app/modules/courses-page/interfaces/courses';
import { HttpErrorResponse } from '@angular/common/http';

export enum CoursesActionsType {
    readAllCourses = '[Courses] read all courses',
    readAllCoursesSuccess = '[Courses] read all courses success',
    readAllCoursesError = '[Courses] read all courses error',
    readSearchCourses = '[Courses] read search courses',
    readSearchCoursesSuccess = '[Courses] read search courses success',
    readSearchCoursesError = '[Courses] read search courses error',
    createCourse = '[Courses] create course',
    createCourseSuccess = '[Courses] create course success',
    createCourseError = '[Courses] create course error',
    updateCourse = '[Courses] update course',
    updateCourseSuccess = '[Courses] update course success',
    updateCourseError = '[Courses] update course error',
    deleteCourse = '[Courses] delete course',
    deleteCourseSuccess = '[Courses] delete course success',
    deleteCourseError = '[Courses] delete course error',
    loadCourses = '[Courses] load courses and add in course list',
    loadCoursesSuccess = '[Courses] load courses and add in course list success',
    loadCoursesError = '[Courses] load courses and add in course list error',
}
/* tslint:disable:max-classes-per-file */
export class ReadAllCoursesAction implements Action {
    readonly type = CoursesActionsType.readAllCourses;
    constructor() {}
}

export class ReadAllCoursesSuccessAction implements Action {
    readonly type = CoursesActionsType.readAllCoursesSuccess;
    constructor(public payload: {courses: Course[]}) {}
}

export class ReadAllCoursesErrorAction implements Action {
    readonly type = CoursesActionsType.readAllCoursesError;
    constructor(public payload: {error: HttpErrorResponse}) {}
}

export class ReadSearchCoursesAction implements Action {
    readonly type = CoursesActionsType.readSearchCourses;
    constructor (public payload: {searchText: string}) {}
}

export class ReadSearchCoursesSuccessAction implements Action {
    readonly type = CoursesActionsType.readSearchCoursesSuccess;
    constructor (public payload: {courses: Course[]}) {}
}

export class ReadSearchCoursesErrorAction implements Action {
    readonly type = CoursesActionsType.readSearchCoursesError;
    constructor(public payload: {error: HttpErrorResponse}) {}
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
    constructor(public payload: {error: HttpErrorResponse}) {}
}

export class UpdateCourseAction implements Action {
    readonly type = CoursesActionsType.updateCourse;
    constructor (public payload: {course: Course}) {}
}

export class UpdateCourseSuccessAction implements Action {
    readonly type = CoursesActionsType.updateCourseSuccess;
    constructor (public payload: {course: Course}) {}
}

export class UpdateCourseErrorAction implements Action {
    readonly type = CoursesActionsType.updateCourseError;
    constructor(public payload: {error: HttpErrorResponse}) {}
}

export class DeleteCourseAction implements Action {
    readonly type = CoursesActionsType.deleteCourse;
    constructor (public payload: {course: Course}) {}
}

export class DeleteCourseSuccessAction implements Action {
    readonly type = CoursesActionsType.deleteCourseSuccess;
    constructor (public payload: {course: Course}) {}
}

export class DeleteCourseErrorAction implements Action {
    readonly type = CoursesActionsType.deleteCourseError;
    constructor(public payload: {error: HttpErrorResponse}) {}
}

export class LoadCoursesAction implements Action {
    readonly type = CoursesActionsType.loadCourses;
    constructor () {}
}

export class LoadCoursesSuccessAction implements Action {
    readonly type = CoursesActionsType.loadCoursesSuccess;
    constructor (public payload: {courses: Course[]}) {}
}

export class LoadCoursesErrorAction implements Action {
    readonly type = CoursesActionsType.loadCoursesError;
    constructor(public payload: {error: HttpErrorResponse}) {}
}
/* tslint:enable:max-classes-per-file */
export type CoursesAction = ReadAllCoursesAction
    | ReadAllCoursesSuccessAction
    | ReadAllCoursesErrorAction
    | ReadSearchCoursesAction
    | ReadSearchCoursesSuccessAction
    | ReadSearchCoursesErrorAction
    | CreateCourseAction
    | CreateCourseSuccessAction
    | CreateCourseErrorAction
    | UpdateCourseAction
    | UpdateCourseSuccessAction
    | UpdateCourseErrorAction
    | DeleteCourseAction
    | DeleteCourseSuccessAction
    | DeleteCourseErrorAction
    | LoadCoursesAction
    | LoadCoursesSuccessAction
    | LoadCoursesErrorAction;
