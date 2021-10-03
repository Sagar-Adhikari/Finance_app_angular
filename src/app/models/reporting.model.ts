export class TrialBalance {
    constructor(
        public creditTotal: number,
        public debitTotal: number,
        public header: ReportHeader,
        public dated: string,
        public lsCreditParticulars: Particulars[] = [],
        public lsDebitParticulars: Particulars[] = [],
        ) {}

        private _linearCreditParticulars: Particulars[] = [];
        private _linearDebitParticulars: Particulars[] = [];

        get linearCreditParticulars():Particulars[] {
            if(this._linearCreditParticulars.length > 0) return this._linearCreditParticulars
            var particulars: Particulars[] = [];
            this.lsCreditParticulars?.forEach(p => {
                p.level = 0;
                particulars.push(p);

                p?.lsParticulars?.forEach(lp => {
                    lp.level = 1;
                    particulars.push(lp);

                    lp?.lsParticulars?.forEach(lsp => {
                        lsp.level = 2;
                        particulars.push(lsp);
                    });
                });


            });
            this._linearCreditParticulars = particulars;
            return particulars;
          }

          public get linearDebitParticulars():Particulars[] {
              if(this._linearDebitParticulars.length > 0) return this._linearDebitParticulars;
            var particulars: Particulars[] = [];
            this.lsDebitParticulars?.forEach(p => {
                p.level = 0;
                particulars.push(p);

                p?.lsParticulars?.forEach(lp => {
                    lp.level = 1;
                    particulars.push(lp);

                    lp?.lsParticulars?.forEach(lsp => {
                        lsp.level = 2;
                        particulars.push(lsp);
                    });
                });


            });
            this._linearDebitParticulars = particulars;
            return particulars;
          }
}

export class ReportHeader {
    constructor(
        public organizationName: string,
        public address: string,
        public phone: string,
        public reportTitle: string,
        public regdNo: string,
        public fromDate: string,
        public toDate: string,
    ) {}
}

export class Particulars {
    constructor(
        public title: string,
        public isCredit: boolean,
        public amount: number,
        public lsParticulars: Particulars[] = []
    ) {}

    public level: number;
}

export class ProfitLossReport {
    constructor(
        public creditTotal: number,
        public debitTotal: number,
        public header: ReportHeader,
        public dated: string,
        public lsIncomeParticulars: Particulars[] = [],
        public lsExpenseParticulars: Particulars[] = [],
        ) {}

        private _linearIncomeParticulars: Particulars[] = [];
        private _linearExpenseParticulars: Particulars[] = [];

        get linearIncomeParticulars():Particulars[] {
            if(this._linearIncomeParticulars.length > 0) return this._linearIncomeParticulars
            var particulars: Particulars[] = [];
            this.lsIncomeParticulars?.forEach(p => {
                p.level = 0;
                particulars.push(p);

                p?.lsParticulars?.forEach(lp => {
                    lp.level = 1;
                    particulars.push(lp);

                    lp?.lsParticulars?.forEach(lsp => {
                        lsp.level = 2;
                        particulars.push(lsp);
                    });
                });


            });
            this._linearIncomeParticulars = particulars;
            return particulars;
          }

          public get linearExpenseParticulars():Particulars[] {
              if(this._linearExpenseParticulars.length > 0) return this._linearExpenseParticulars;
            var particulars: Particulars[] = [];
            this.lsExpenseParticulars?.forEach(p => {
                p.level = 0;
                particulars.push(p);

                p?.lsParticulars?.forEach(lp => {
                    lp.level = 1;
                    particulars.push(lp);

                    lp?.lsParticulars?.forEach(lsp => {
                        lsp.level = 2;
                        particulars.push(lsp);
                    });
                });


            });
            this._linearExpenseParticulars = particulars;
            return particulars;
          }
}
