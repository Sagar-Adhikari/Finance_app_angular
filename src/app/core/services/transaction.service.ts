import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { NewParticularModel } from 'src/app/models/particular.model';
import { environment } from 'src/environments/environment';
import { NewSubAccountModel } from 'src/app/models/account.model';
import { NewMemberView } from 'src/app/components/new-member/models/new-member.model';
import { SearchTransactionLedgerView, NewTransactionData } from 'src/app/components/transaction/models/transaction.model';

@Injectable({
    providedIn: "root",
})

export class TransactionService {
    constructor(private baseService: BaseService) { }

    createNewParticular(newItem: NewParticularModel) {
        var url = environment.reportingApiUrl + '/particulars/createNew'
        return this.baseService.post(url, {}, newItem);
    }

    createNewSubAccount(newItem: NewSubAccountModel) {
        var url = environment.reportingApiUrl + '/subaccount/createNew'
        return this.baseService.post(url, {}, newItem);
    }

    createNewMember(newMember: NewMemberView) {
      debugger;
        var url = environment.reportingApiUrl + '/members/createNew'
        return this.baseService.post(url, {}, newMember);
    }

    getMemberLedger(searchModel: SearchTransactionLedgerView) {
        var url = environment.reportingApiUrl + '/transaction/getMemberLedger'
        return this.baseService.post(url, {}, searchModel);
    }

    getAccountLedger(searchModel: SearchTransactionLedgerView) {
        var url = environment.reportingApiUrl + '/transaction/getAccountLedger'
        return this.baseService.post(url, {}, searchModel);
    }

    createNewTransaction(newTransactionData: NewTransactionData) {
        var url = environment.reportingApiUrl + '/transaction/saveTransaction'
        return this.baseService.post(url, {}, newTransactionData);
    }
}
