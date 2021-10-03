import { LanguageEnum } from './enum_collection';
import { ReportHeader } from './reporting.model';

export class LoanFilterData {

    public genderId: number;
    public antGrpID: number;

    public district: String;
    public vdc: String;
    public ward: String;
    public tole: String;

    public jatiId: number;

    public selectedLanguage: LanguageEnum;
    public reportFor: LoanReportFor;

    public byajBankiDin: number;
    public bhakhaNageko: boolean;
    public purpose: boolean;
}

export enum LoanReportFor {
    kista,
    rinList,
    rinTerij
}

export class KistaView {
    lid: string;
    msn: string;
    memName: string;
    nameInDev: string;
    memType: string;
    address: string;
    addDev: string;
    phone1: string;
    phone: string;
    lastPaidDate: string;
    totSanwa: string;
    total: string;
    din: string;
    gata: string;
    yesha: string;
    jamma: string;
    kn: string;
    dinSN: string;
    loanID: string;
}

export class KistaReportView {
    constructor(
        public header: ReportHeader,
        public selectedLanguage: LanguageEnum,
        public lsKistas: KistaView[]
    ) { }
}

export class RinRakamView {
    dinSN: string;
    lid: string;
    msn: string;
    memName: string;
    sid: string;
    purpose: string;
    loanDate: string;
    asuliSan: string;
    loanAabadhi: string;
    address: string;
    addDev: string;
    lastPaidDate: string;
    rinAmt: string;
    total: string;
    bhaNaSan: string;
    bhaNaNaSan: string;
    din: string;
    ph1: string;
    ph2: string;
    phones: string;
    stgByaj: string;
    bByaj: string;
    abaKistaON: string;
    abaKistaAmt: string;
    subAccNameDev: string;
    purposeDev: string;
    accSN: string;
    rate: string;
    harjana: string;
    fNo: string;
    loanType: string;
    intASN: string;
    intSAccID: string;
    memSN: string;
    purpID: string;
    antGrpID: string;
}

export class RinRakamReportView {
    constructor(
        public header: ReportHeader,
        public selectedLanguage: LanguageEnum,
        public lsRinRakams: RinRakamView[]
    ) { }
}

export class RinTerijView {
    purpID: string;
    purpose : string;
    purposeDev : string;
    purpCatID: string;
    purpCatName: string;
    purpCatNDev: string;
    bhaNa1YearUp: string;
    bhaNa6To12: string;
    bhaNa3To6: string;
    bhaNa0to3: string;
    bhaNa1YrBelow: string;
    bhaNaTotal: string;
    bhaNaNaSan: string;
    totalLagani: string;
    gataByaj: string;
    bByaj: string;
    totByaj: string;
}

export class RinTerijReportView {
    purpose: boolean;
    header: ReportHeader;
    selectedLanguage: LanguageEnum;
    lsRinTerijs: RinTerijView[];
}