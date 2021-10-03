import { UserState, initialuserState } from './user.state';
import { ApplicationUsersState, initialApplicationUsersState } from './applicationUsers.state';
import { RolesState, initialRolesState } from './roles.state';
import { PwSettingsState, initialSettingsState } from './pw-settings.state';
import { TransactionState, initialTransactionState } from './transaction.state';

export interface AppState {
    user: UserState;
    applicationUsers: ApplicationUsersState;
    roles: RolesState;
    settings: PwSettingsState;
    transactionState: TransactionState;
}

export const initialappState: AppState = {
    user: initialuserState,
    applicationUsers: initialApplicationUsersState,
    roles: initialRolesState,
    settings: initialSettingsState,
    transactionState: initialTransactionState
};

export function getInitialState(): AppState {
    return initialappState;
}
