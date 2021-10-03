import { createAction, props } from '@ngrx/store';
import { ApplicationUser } from '../models/applicationUser.model';
import { NewUser } from '../models/newUser.model';
import { PaginationView } from '../models/api-reponse.model';

export const loadUsers = createAction('[Load Users] Users', props<{ page: number, limit: number}>());

export const loadUsersComplete = createAction('[Load Users Complete] Users', props<{ payload: PaginationView<ApplicationUser> }>());

export const loadusersFailed = createAction('[Load Users Failed] Users', props<{ errorMessage: string }>());

export const createNewUser = createAction('[Create New User] Users', props<{ payload: NewUser}>());

export const createNewComplete = createAction('[Create New User Complete] Users', props<{ payload: ApplicationUser }>());

export const createNewFailed = createAction('[Create New User Failed] Users', props<{ errorMessage: string}>());

export const deleteUser = createAction('[Delete User] Users', props<{ payload: string }>());

export const deleteUserCompleted = createAction('[Delete User Completed] Users', props<{ payload: string }>());

export const deleteUserFailed = createAction('[Delete User Failed] Users', props<{ errorMessage: string }>());

export const updateUser = createAction('[Update User] Users', props<{ payload: NewUser , id: string}>());

export const updateUserComplete = createAction('[Update User Complete] Users', props<{ payload: ApplicationUser }>());

export const updateUseFailed = createAction('[Update User Failed] Users', props<{ errorMessage: string}>());