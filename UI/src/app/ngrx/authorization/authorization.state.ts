import { User } from 'src/app/modules/shared/models/user';

export interface AuthorizationState {
    isAuthenticated: boolean;
    user: User;
}

export const initialState: AuthorizationState = {
    isAuthenticated: false,
    user: null
};
