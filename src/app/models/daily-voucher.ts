export class DailyVoucher {
  constructor(
    public header: ReportHeader ,
    public chequeNumbers:[],
    public dayVouchers:DayVoucher

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
export class DayVoucher{
  constructor(
  public AccountDetailDev  :string,
  public AccountDetail:string,
  public AccountId :string,
  public DrAmt :number,
  public CrAmt :number
  ){}
}
