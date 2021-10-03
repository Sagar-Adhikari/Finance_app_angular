export class SubAccount {
    constructor(public subAccID: number, public accID:number, public accSN: number, public subAccName: String){}
}

export class AccountModel {
    constructor(public accID: number, public actAccID: number, public accName: String, public accNameDev: String){}
}
export class NewSubAccountModel {
    constructor(public accID: number){};
    subAccName: string = '';
    subAccNameDev: string;
    subAccAdd: string;
    contact: string;
    accTypeCat: number;
    hidden: boolean = false;
    diffACAuto: boolean = false;
    diffACAutoASN: number;
    billToNonAcName: boolean = false;
    incGMem: boolean = false;
    incMem: boolean = false;
    incMemCat: boolean = false;
    incMemType: boolean = false;
    subAcIDWala: boolean = false;
    defByjAccSN: number;
}