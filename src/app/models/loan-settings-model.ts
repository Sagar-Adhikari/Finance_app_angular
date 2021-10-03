export class LoanSettingsModel {
    public viewLoanMemberIdwise: boolean;
    public wholeSanwaHarjana: boolean;
    public keepMidTypeRate: boolean;
    public useAutoBachatHarjana: boolean;
    public includeByajIntoSanwa: boolean;
    public clearByajDuringDailyLoanEntry: boolean;
    public assumeGataByajForPrevYear: boolean;
    public enableOptionOfRinMagFaram: boolean;
    public autoChutCalculation: boolean;
    public percentSkChhut: number;
    public harjanaChutDin: number;
    public chutPercentForAsalRini: number;
    public changeInterestRateBy: number;
    public changeInterestRateWithinDays: number;
    public changeInterestRateWithinDaysFrom: number;
    public enableFirstDateAsByajDate: boolean;
    public mergeHarjanaAndByaj: boolean;
    public autoHarjanaOnHassets: LoanSettingAutoHarjanaOnAssets;
}

export enum LoanSettingAutoHarjanaOnAssets {
    noAutoHarjana,
    calcHarjanaWrtLoanRate,
    calcHarjanaMonthwiseWithBhaNaDays
}

export class TblSngRegModel {
    public sN: number;
    public regCode: number;
    public datedE: string;
    public regValue: string;
    public remarks: string;
}