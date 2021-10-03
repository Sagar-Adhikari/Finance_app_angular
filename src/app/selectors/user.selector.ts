import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';


export const currentUser = createSelector(
  (state: AppState) => state.user,
  (userState: UserState) => userState.user,
);