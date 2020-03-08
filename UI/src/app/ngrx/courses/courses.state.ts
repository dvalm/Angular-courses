import { Course } from 'src/app/modules/courses-page/models/course';

export interface CoursesState {
    courses: Course[];
}

export const initialState: CoursesState = {
    courses: []
};
