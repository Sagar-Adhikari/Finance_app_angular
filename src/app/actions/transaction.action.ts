import { createAction, props } from '@ngrx/store';
import { AccountModel, SubAccount } from '../models/account.model';
import { ParticularModel } from '../models/particular.model';

export const setSelectedAcc = createAction('[Transaction Page] Set Account Id', props<{ payload: AccountModel }>());
export const setAccSN = createAction('[Transaction Page] Set Account SN', props<{ payload: number }>());
export const setNewParticulId = createAction('[New Particular Page] Set New Particu Id', props<{ payload: number }>());
export const setNewSubAccId = createAction('[New Sub Account Page] Set New Sub Acc Id', props<{ payload: number }>());
export const setSelectedParticular = createAction('[Transaction Page] Set Particular', props<{ payload: ParticularModel }>());
export const setBankSubAccounts = createAction('[Transaction Page] Set Bank Sub Accounts', props<{ payload: SubAccount[] }>());
export const setNonBankSubAccounts = createAction('[Transaction Page] Set Non Bank Sub Accounts', props<{ payload: SubAccount[] }>());
export const setNewTSN = createAction('[Transaction Page] Set New TSN', props<{ payload: number }>());
