import { createAction, props } from '@ngrx/store';
import { AuthUser, ChangePasswordView } from '../models/authuser.model';

export const login = createAction('[Login Page] Login');

export const loginComplete = createAction('[Login Page] Login Complete', props<{ payload: AuthUser }>());

export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ errorMessage: string }>()
);

export const logOut = createAction('[Login Page] Logout');

export const updatUserInfo = createAction('[Update Shakha]', props<{ payload: AuthUser}>());