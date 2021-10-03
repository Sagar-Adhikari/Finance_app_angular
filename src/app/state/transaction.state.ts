import { AccountModel, SubAccount } from '../models/account.model';
import { ParticularModel } from '../models/particular.model';

export interface TransactionState {
    selectedAcc: AccountModel;
    selectedParticular: ParticularModel;
    lsBankSubAccounts: SubAccount[];
    lsNonBankSubAccounts: SubAccount[];
    accSN: number;
    newParticuId: number;
    newSubAccId: number;
    newTSN:number;
}

export const initialTransactionState: TransactionState = {
    selectedAcc: null,
    selectedParticular: null,
    accSN: null,
    newTSN:null,
    newParticuId: null,
    newSubAccId: null,
    lsBankSubAccounts: null,
    lsNonBankSubAccounts: null
};
