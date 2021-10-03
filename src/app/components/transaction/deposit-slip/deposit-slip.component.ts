import { AppState } from "./../../../state/app.state";
import { Store } from "@ngrx/store";
import { MatDialogRef } from "@angular/material/dialog";
import { ReportService } from "src/app/core/services/report.service";
import { LoanDeposit } from "../../../models/loan-deposit.model";
import { GlobalService } from "../../../global.service";
import { Component, OnInit } from "@angular/core";
import depositSlipCss from "./deposit-slip.component.css";

@Component({
  selector: "app-deposit-slip",
  templateUrl: "./deposit-slip.component.html",
  styleUrls: ["./deposit-slip.component.css"],
})
export class DepositSlipComponent implements OnInit {
  public loanDeposit: LoanDeposit;
  maxLength: number;
  totalAmount;
  private tsn: number = 54546;

  constructor(
    private globalService: GlobalService,
    private reportService: ReportService,
    public dialogRef: MatDialogRef<DepositSlipComponent>,
    private store: Store<AppState>
  ) {
    this.globalService.setLayout({
      pageTitle: "Loan Deposit",
      allowFooter: false,
    });
  }

  ngOnInit(): void {
    this.loanDepositData();
  }

  loanDepositData() {
    this.store.select((state) => state.transactionState).subscribe((tS) => {
        console.log("ts::", tS.newTSN);
        this.tsn = tS.newTSN;
      });
    this.reportService.getLoanDeposit(this.tsn).subscribe((x) => {
      x as LoanDeposit;
      var lD = x as LoanDeposit;
      this.loanDeposit = new LoanDeposit(
        lD.header,
        lD.language,
        lD.billNumber,
        lD.date,
        lD.memberId,
        lD.memberName,
        lD.memberAddress,
        lD.lsBillReportItems,
        lD.chut,
        lD.savingTotal,
        lD.loanAmount,
        lD.nextKistaDate,
        lD.nextKistaAmount,
        lD.userName
      );
      console.log('DepositSlip:',this.loanDeposit);
    });
  }
  cancel() {
    this.dialogRef.close("cancel");
  }

  printDocument() {
    let printContents, popupWin;
    printContents = document.getElementById("printLayout").innerHTML;
    var a = depositSlipCss;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.write(`
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>AdminApp</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link  rel="stylesheet">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <style>
        app-root { display:none; }
        ${depositSlipCss}
      </style>
    </head>
    <body class="mat-typography">
    <app-root></app-root>
    ${printContents}
    <script src="runtime.js" type="module"></script><script src="polyfills.js" type="module"></script><script src="styles.js" type="module"></script><script src="vendor.js" type="module"></script><script src="main.js" type="module"></script></body>
    </html>
    `);
    popupWin.document.close();
  }
}
