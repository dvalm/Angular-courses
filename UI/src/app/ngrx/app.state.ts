import { AuthorizationState } from './authorization/authorization.state';
import { CoursesState } from './courses/courses.state';

export interface State {
  authorizationState: AuthorizationState;
  coursesState: CoursesState;
}
