import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { UserReducer } from './user.reducer';
import { routerReducer } from '@ngrx/router-store';
import { ApplicationUsersReducer } from './applicationUser.reducer';
import { RolesReducer } from './roles.reducer';
import { PwSettingsReducer } from './pw-settings.reducer';
import { TransactionReducer } from './transaction.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  user: UserReducer,
  applicationUsers: ApplicationUsersReducer,
  roles: RolesReducer,
  settings: PwSettingsReducer,
  transactionState: TransactionReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
