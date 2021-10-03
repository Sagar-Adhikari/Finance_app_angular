import { GlobalService } from './../../../global.service';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';
import { TrialBalance } from 'src/app/models/reporting.model';
import trialBalanceCss from './trial-balance.component.css';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.css']
})
export class TrialBalanceComponent implements OnInit {

  public trialBalance: TrialBalance;
  public maxLength: number = 0;
  public title: string = "Trial Balance";
  public fromDate: string;
  public toDate: string;
  public loading: boolean = true;

  public today = Date.now();
  constructor(private reportService: ReportService, private store: Store<AppState>,private globalService:GlobalService) {
    this.store.select(state => state.settings)
      .subscribe(
        settingsState => {
          if (settingsState.nepaliDate != null) {
            var dt = new Date(settingsState.nepaliDate);
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;//js getMonth month begins from 0.
            var day = dt.getDate();

            this.toDate = year + '/' + month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0');
            this.fromDate = year + '/01/01';
            this.loading = false;
          }
        }

      );

      this.globalService.setLayout({pageTitle:'Trial Balance Report',allowFooter:false});
  }

  ngOnInit(): void {
  }

  getTrialBalanceReport() {
    this.loading = true;
    this.reportService.getTrialBalalnce(this.fromDate, this.toDate).subscribe(r => {
      var tB = r as TrialBalance
      this.trialBalance = new TrialBalance(
        tB.creditTotal,
        tB.debitTotal,
        tB.header,
        tB.dated,
        tB.lsCreditParticulars,
        tB.lsDebitParticulars,
      );
      this.maxLength = Math.max(this.trialBalance.linearCreditParticulars.length, this.trialBalance.linearDebitParticulars.length);
      this.loading = false;
    });
  }

  getPrefix(index: number) {
    switch (index) {
      case 0:
        return '#';
        break;
      case 1:
        return '$';
        break;
      case 2:
        return '*';
      default:
        return '';
    }

  }

  printDocument() {
    let printContents, popupWin;
    printContents = document.getElementById("printLayout").innerHTML;
    var a = trialBalanceCss;
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
        ${trialBalanceCss}
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
