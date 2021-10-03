import * as ApplicationUserActions from '../actions/applicationUser.action';
import { on, createReducer, Action } from '@ngrx/store';
import { ApplicationUsersState, initialApplicationUsersState } from '../state/applicationUsers.state';

const applicationUserReducer = createReducer(
    initialApplicationUsersState,
    on(ApplicationUserActions.loadUsers, state => ({
        ...state,
        users: null,
        errormsg: null,
        loading: true
    })),
    on(ApplicationUserActions.loadUsersComplete, (state: ApplicationUsersState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        users: payload
    })),
    on(ApplicationUserActions.loadusersFailed, (state: ApplicationUsersState, { errorMessage } ) => ({
        ...state,
        loading: false,
        errormsg: errorMessage,
        users: null
    })),
    on(ApplicationUserActions.createNewComplete, (state: ApplicationUsersState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        users: { ...state.users, contents: [...state.users.contents, payload] }
    })),
    on(ApplicationUserActions.deleteUserCompleted, (state: ApplicationUsersState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        users: { ...state.users, contents: state.users.contents.filter(user => user.id !== payload) }
    })),

  );

  export function ApplicationUsersReducer(state: ApplicationUsersState | undefined, action: Action) {
    return applicationUserReducer(state, action);
  }