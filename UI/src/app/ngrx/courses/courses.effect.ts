import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CoursesState } from './courses.state';
import { CoursesService } from 'src/app/modules/courses-page/services/courses.service';
import { CoursesActionsType, CreateCourseAction, CreateCourseErrorAction, CreateCourseSuccessAction,
    UpdateCourseErrorAction, UpdateCourseSuccessAction, RemoveCourseAction, UpdateCourseAction,
    RemoveCourseSuccessAction, RemoveCourseErrorAction } from './courses.action';
import { Course } from 'src/app/modules/courses-page/models/course';
import { HttpErrorResponse } from '@angular/common/http';
import { ICourse } from 'src/app/modules/courses-page/interfaces/courses';

@Injectable()
export class CoursesEffects {

    @Effect({ dispatch: false })
    createCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.createCourse),
        mergeMap((action: CreateCourseAction) => this.coursesService.createCourse(action.payload.course).pipe(
            map((data: ICourse) => {
                this.toastr.success('Course created successfully!');
                const course = new Course(data.id, data.name, data.date, data.length,
                                          data.description, data.isTopRated);
                return this.store$.dispatch(new CreateCourseSuccessAction({ course: course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(new CreateCourseErrorAction());
            }))
        )
    );

    @Effect({ dispatch: false })
    updateCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.updateCourse),
        mergeMap((action: UpdateCourseAction) => this.coursesService.updateCourse(action.payload.course).pipe(
            map((data: ICourse) => {
                this.toastr.success('Course updated successfully!');
                const course = new Course(data.id, data.name, data.date, data.length,
                                          data.description, data.isTopRated);
                return this.store$.dispatch(new UpdateCourseSuccessAction({ course: course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(new UpdateCourseErrorAction());
            }))
        )
    );

    @Effect({ dispatch: false })
    removeCourse$ = this.actions$.pipe(
        ofType(CoursesActionsType.removeCourse),
        mergeMap((action: RemoveCourseAction) => this.coursesService.removeCourse(action.payload.course).pipe(
            map(() => {
                this.coursesService.courseslength--;
                this.toastr.success('Course removed successfully!');
                return this.store$.dispatch(new RemoveCourseSuccessAction({ course: action.payload.course }));
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.toastr.error(`${httpError.status} ${httpError.statusText}`);
                return of(new RemoveCourseErrorAction());
            }))
        )
    );

    constructor(private actions$: Actions,
        private store$: Store<CoursesState>,
        private toastr: ToastrService,
        private coursesService: CoursesService) { }
}
