import { createAction, props } from '@ngrx/store';
import { Role } from '../models/role';

export const loadRoles = createAction('[Load Roles] Roles');

export const loadRolesComplete = createAction('[Load Roles Complete] Roles', props<{ payload: Role[] }>());

export const loadRolesFailed = createAction('[Load Roles Failed] Roles', props<{ errorMessage: string }>());

export const createNewRole = createAction('[Create New Role] Roles', props<{ payload: Role}>());

export const createNewRoleComplete = createAction('[Create New Role Complete] Roles', props<{ payload: Role }>());

export const createNewRoleFailed = createAction('[Create New Role Failed] Roles', props<{ errorMessage: string}>());

export const deleteRole = createAction('[Delete Role] Roles', props<{ payload: Role}>());

export const deleteRoleComplete = createAction('[Delete Role Complete] Roles', props<{ payload: Role }>());

export const deleteRoleFailed = createAction('[Delete New Role Failed] Roles', props<{ errorMessage: string}>());

