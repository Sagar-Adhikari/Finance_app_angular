import * as RolesActions from '../actions/role.action';
import { on, createReducer, Action } from '@ngrx/store';
import { RolesState, initialRolesState } from '../state/roles.state';

const rolesReducer = createReducer(
    initialRolesState,
    on(RolesActions.loadRoles, (state: RolesState) => ({
        ...state,
        roles: null,
        errormsg: null,
        loading: true
    })),
    on(RolesActions.loadRolesComplete, (state: RolesState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        roles: payload
    })),
    on(RolesActions.loadRolesFailed, (state: RolesState, { errorMessage } ) => ({
        ...state,
        loading: false,
        errormsg: errorMessage,
        roles: null
    })),
    on(RolesActions.createNewRoleComplete, (state: RolesState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        roles: [ ...state.roles, payload ]
    })),
    on(RolesActions.deleteRoleComplete, (state: RolesState, { payload } ) => ({
        ...state,
        loading: false,
        errormsg: null,
        roles: state.roles.filter(role => role.id !== payload.id)
    })),
    
  );

  export function RolesReducer(state: RolesState | undefined, action: Action) {
    return rolesReducer(state, action);
  }