export class LoanDeposit {
  constructor(
    public header: ReportHeader ,
    public language: string,
    public billNumber: number,
    public date: string,
    public memberId: string,
    public memberName: string,
    public memberAddress: string,
    public lsBillReportItems: BillReportItem,
    public chut: string,
    public savingTotal: string,
    public loanAmount: string,
    public nextKistaDate: string,
    public nextKistaAmount: string,
    public userName: string
  ) {}
}

export class ReportHeader {
  constructor(
    public organizationName: string,
    public address: string,
    public phone: string,
    public reportTitle: string,
    public regdNo: string,
    public fromDate: string,
    public toDate: string
  ) {}
}
export class BillReportItem {
  constructor(
    public sn: number,
    public detail: string,
    public amount: string
  ) {}
}
