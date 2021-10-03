import { initialTransactionState, TransactionState } from '../state/transaction.state';
import * as TransactionActions from '../actions/transaction.action';
import { on, createReducer, Action } from '@ngrx/store';

const transactionReducer = createReducer(
    initialTransactionState,
    on(TransactionActions.setSelectedAcc, (state: TransactionState, { payload } ) => ({
      ...state,
      selectedAcc: payload,
      accSN: null,
      selectedParticular: null
    })),
    on(TransactionActions.setAccSN, (state: TransactionState, { payload } ) => ({
      ...state,
      accSN: payload,
      selectedParticular: null,
    })),
    on(TransactionActions.setNewParticulId, (state: TransactionState, { payload } ) => ({
      ...state,
      newParticuId: payload,
    })),
    on(TransactionActions.setNewSubAccId, (state: TransactionState, { payload } ) => ({
      ...state,
      newSubAccId: payload,
      selectedParticular: null,
    })),
    on(TransactionActions.setSelectedParticular, (state: TransactionState, { payload } ) => ({
      ...state,
      selectedParticular: payload,
    })),
    on(TransactionActions.setBankSubAccounts, (state: TransactionState, { payload } ) => ({
      ...state,
      lsBankSubAccounts: payload,
    })),
    on(TransactionActions.setNonBankSubAccounts, (state: TransactionState, { payload } ) => ({
      ...state,
      lsNonBankSubAccounts: payload,
    })),
    on(TransactionActions.setNewTSN, (state: TransactionState, { payload } ) => ({
      ...state,
      newTSN: payload,

    })),
  );

  export function TransactionReducer(state: TransactionState | undefined, action: Action) {
    return transactionReducer(state, action);
  }
