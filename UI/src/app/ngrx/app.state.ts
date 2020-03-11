import { AuthorizationState } from './authorization/authorization.state';
import { ICoursesState } from './courses/courses.state';

export interface State {
  authorizationState: AuthorizationState;
  coursesState: ICoursesState;
}
