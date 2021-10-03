import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ApplicationUsersState } from '../state/applicationUsers.state';


export const applicationUsers = createSelector(
  (state: AppState) => state.applicationUsers,
  (applicationUsersState: ApplicationUsersState) => applicationUsersState.users,
);