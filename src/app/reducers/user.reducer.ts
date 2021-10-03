import { initialuserState, UserState } from '../state/user.state';
import * as UserActions from '../actions/user.action';
import { on, createReducer, Action } from '@ngrx/store';

const userReducer = createReducer(
  initialuserState,
  on(UserActions.login, state => ({
    ...state,
    user: null,
    errormsg: null,
    loading: true
  })),
  on(UserActions.loginComplete, (state: UserState, { payload }) => ({
    ...state,
    loading: false,
    errormsg: null,
    user: payload
  })),
  on(UserActions.loginFailure, (state: UserState, { errorMessage }) => ({
    ...state,
    loading: false,
    user: null,
    errorsg: errorMessage
  })),
  on(UserActions.logOut, (state: UserState) => ({
    ...state,
    loading: false,
    user: null,
    errorsg: null
  })),
  on(UserActions.updatUserInfo, (state: UserState, { payload } ) => ({
    ...state,
    user: payload
  })),
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}