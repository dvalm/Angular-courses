import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ICoursesState } from './courses.state';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';
import { CoursesActionsType, CreateCourseAction, CreateCourseErrorAction, CreateCourseSuccessAction,
    UpdateCourseErrorAction, UpdateCourseSuccessAction, DeleteCourseAction, UpdateCourseAction,
    DeleteCourseSuccessAction, DeleteCourseErrorAction, ReadAllCoursesSuccessAction, ReadAllCoursesErrorAction,
    LoadCoursesSuccessAction, LoadCoursesErrorAction, ReadSearchCoursesErrorAction, ReadSearchCoursesAction,
    ReadSearchCoursesSuccessAction } from './courses.action';
import { Course } from 'src/app/modules/courses-page/models/course';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from 'src/app/modules/courses-page/interfaces/courses';
import { IAuthor } from 'src/app/modules/courses-page/interfaces/author';
import { Author } from 'src/app/modules/courses-page/models/author';

@Injectable()
export class CoursesEffects {

    @Effect({ dispatch: false })
    createCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.createCourse),
        switchMap((action: CreateCourseAction) => this.coursesService.createCourse(action.payload.course).pipe(
            map((data: ICourse) => {
                this.toastr.success('Course created successfully!');
                const authors = data.authors.map((author: IAuthor) => new Author(author.id,
                    author.firstName ? author.firstName : author.name, author.lastName));
                const course = new Course(data.id, data.name, data.date, data.length,
                                          data.description, data.isTopRated, authors);
                return this.store$.dispatch(new CreateCourseSuccessAction({ course: course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new CreateCourseErrorAction({error: httpError})));
            }))
        )
    );

    @Effect({ dispatch: false })
    updateCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.updateCourse),
        switchMap((action: UpdateCourseAction) => this.coursesService.updateCourse(action.payload.course).pipe(
            map((data: ICourse) => {
                const authors = data.authors.map((author: IAuthor) => new Author(author.id,
                    author.firstName ? author.firstName : author.name, author.lastName));
                const course = new Course(data.id, data.name, data.date, data.length,
                    data.description, data.isTopRated, authors);
                this.toastr.success('Course updated successfully!');
                return this.store$.dispatch(new UpdateCourseSuccessAction({ course: course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new UpdateCourseErrorAction({error: httpError})));
            }))
        )
    );

    @Effect({ dispatch: false })
    deleteCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.deleteCourse),
        switchMap((action: DeleteCourseAction) => this.coursesService.deleteCourse(action.payload.course).pipe(
            map(() => {
                this.coursesService.coursesLength--;
                this.toastr.success('Course removed successfully!');
                return this.store$.dispatch(new DeleteCourseSuccessAction({ course: action.payload.course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new DeleteCourseErrorAction({error: httpError})));
            }))
        )
    );

    @Effect({ dispatch: false })
    readAllCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.readAllCourses),
        switchMap(() => this.coursesService.readAllCourses().pipe(
            map((courses: Course[]) => this.store$.dispatch(new ReadAllCoursesSuccessAction({courses: courses}))),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new ReadAllCoursesErrorAction({error: httpError})));
            }))
        )
    );

    @Effect({ dispatch: false })
    loadCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.loadCourses),
        switchMap(() => this.coursesService.loadCourses().pipe(
            map((courses: Course[]) => this.store$.dispatch(new LoadCoursesSuccessAction({courses: courses}))),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new LoadCoursesErrorAction({error: httpError})));
            }))
        )
    );

    @Effect({ dispatch: false })
   readSearchCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.readSearchCourses),
        switchMap((action: ReadSearchCoursesAction) => this.coursesService.searchCourses(action.payload.searchText).pipe(
            map((courses: Course[]) => this.store$.dispatch(new ReadSearchCoursesSuccessAction({courses: courses}))),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(this.store$.dispatch(new ReadSearchCoursesErrorAction({error: httpError})));
            }))
        )
    );

    constructor(private actions$: Actions,
        private store$: Store<ICoursesState>,
        private toastr: ToastrService,
        private coursesService: CoursesService) { }
}
