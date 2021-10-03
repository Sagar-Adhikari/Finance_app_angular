import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { RolesState } from '../state/roles.state';


export const roles = createSelector(
  (state: AppState) => state.roles,
  (rolesState: RolesState) => rolesState.roles,
);