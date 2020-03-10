import { Course } from 'src/app/modules/courses-page/models/course';
import { HttpErrorResponse } from '@angular/common/http';

export interface ICoursesState {
    courses: Course[];
    error: HttpErrorResponse;
}

export const initialState: ICoursesState = {
    courses: [],
    error: null
};
