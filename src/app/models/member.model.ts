import { SortOrderEnum, LanguageEnum, MemberFilterSortFieldsEnum } from './enum_collection';
import { ReportHeader } from './reporting.model';

export class MemberFilterData {
    public fromDate: String;
    public toDate: String;

    public shareMembersSelected: boolean;
    public gairShareMembersSelected: boolean;
    public offMembersSelected: boolean;
    public membersCreatedSelected: boolean;
    public displayBalanceSelected: boolean;
    public subAccountId: number;

    public caste: String;
    public genderId: number;
    public upID: number;
    public antGrpID: number;
    public balSelected: boolean;

    public district: String;
    public vdc: String;
    public ward: String;
    public tole: String;

    public jatiId: number;
    public amount: number;

    public searchForTinpuste: boolean;

    public sortOrder: SortOrderEnum;
    public selectedLanguage: LanguageEnum;
    public sortBy: MemberFilterSortFieldsEnum;
}

export class MemberView {
    constructor(

        public id: number,
        public fullName: String,
        public groupId: number,
        public address: String,
        public phone: String,
        public blockNo: String,
        public remarks: String,
        public memType: number,
        public shareAmt: String
    ) { }
}

export class MemberReportView {
    constructor(
        public header: ReportHeader,
        public balSelected: boolean,
        public selectedLanguage: LanguageEnum,
        public lsMembers: MemberView[]
    ) { }
}


export class TinpusteView {
    constructor(
        public sn: number,
        public memID: number,
        public memType: string,
        public memName: string,
        public nameInDev: string,
        public address: string,
        public addDev: string,
        public dOBE: string,
        public dOBN: string,
        public citzNo: string,
        public fathName: string,
        public fathNameDev: string,
        public granFathName: string,
        public granFathNameDev: string,
        public shareAmt: string,
        public savAmt: string,
        public rinAmt: string,
    ) { }
}

export class TinpusteReportView {
    constructor(
        public header: ReportHeader,
        public balSelected: boolean,
        public selectedLanguage: LanguageEnum,
        public lsMembers: TinpusteView[]
    ) { }
}


export class MemberTransactionView {
    constructor(
        public sn: number,
        public memID: number,
        public memFName: String,
        public memMName: String,
        public memLName: String,
        public photoUrl: String,
        public sig1Url: String,
        public sig2Url: String,
    ){ }
}