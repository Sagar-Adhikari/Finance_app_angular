
export class SearchTransactionLedgerView {
    datedStart: string;
    datedEnd: string;
    accSN: number;
    accID: number;
    memID: number;
    accBal: number;
}


export class TransactionLedgerView {
    dated: string;
    particulars: string;
    BRNo: string;
    checkNo: string;
    drAmt: string;
    crAmt: string;
    balance: string;
    drCr: string;
    remarks: string;
}

export class NewTransactionData {
    billRNo: number = 0;
    datedN: string;
    tranCmnt: string;
    clrDateE: string;
    clrDateN: string;
    vchType: string;
    vchNo: string;
    tranBranchCode: string;
    tranAppCode: string;
    dMSNo: string;
    shakhaID: number = 0;
    vchKind: string;
    vchNo1: string;
    memType: string;
    facID: string;
    acLevelID: string;
    yearSemester: string;
    acCodeID: string;
    cSN: string;
    particuID: number = 0;
    chequeNo: string;
    bearersName: string;
    bachatMonth: string;
    bachatYear: string;
    drAmt: number = 0;
    crAmt: number = 0;
    memSN: number = 0;
    posted: string;
    interested: string;
    marked: string;
    subAccBal: string;
    subDrCr: string;
    accBal: string;
    accDrcr: string;
    cmnts: string;
    intAmt: string;
    bRSN: string;
    userNoVF: string;
    prtRemAmt: string;
    thisPaid: string;
    cashPaid: string;
    isTransactionCash: boolean = true;
    transaction1CheckInfo: CheckTransactionModel;
    transaction2CheckInfo: CheckTransactionModel;
}


export class CheckTransactionModel {
    accSN: number = 0;
    chequeNo: string;
    bearersName: string;
    bachatMonth: string;
}