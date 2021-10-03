import { GlobalService } from './../../global.service';
import { PwSettingsState } from './../../state/pw-settings.state';
import { Store } from '@ngrx/store';
import { AppState } from './../../state/app.state';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/core/services/report.service';
import { ProfitLossReport } from 'src/app/models/reporting.model';
import profitLossCss from './profitloss.component.css';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.css']
})
export class ProfitlossComponent implements OnInit {

  public profitLoss: ProfitLossReport;
  public maxLength: number = 0;
  public today = Date.now();
  public total: number;
  public title: String = "Profit Loss";

  public fromDate:string;
  public toDate:string;
  public loading: boolean = true;

  constructor(private reportService: ReportService,private store:Store<AppState>,private globalService:GlobalService) {
    this.store.select(state=>state.settings).subscribe(settingsState=>{
      if(settingsState.nepaliDate!=null){
        var dt = new Date(settingsState.nepaliDate);
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;//js getMonth month begins from 0.
        var day = dt.getDate();

        this.toDate = year + '/' + month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0');
        this.fromDate = year + '/01/01';
        this.loading = false;
      }
    });
    this.globalService.setLayout({pageTitle:'Profit And Loss Report',allowFooter:false});
    // this.globalService.setLoading(false);
   }

  ngOnInit(): void {

  }


  getPrefix(index: number) {
    switch (index) {
      case 0:
        return '$';
        break;
      case 1:
        return '*';
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
    var a = profitLossCss;
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
        ${profitLossCss}
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

  getProfitAndLossReport(){
    this.reportService.getProfitLoss(this.fromDate,this.toDate).subscribe(r => {
      console.log('profit and loss:',r);
      var pL = r as ProfitLossReport
      this.profitLoss = new ProfitLossReport(
        pL.creditTotal,
        pL.debitTotal,
        pL.header,
        pL.dated,
        pL.lsIncomeParticulars,
        pL.lsExpenseParticulars,
      );
      this.maxLength = Math.max(this.profitLoss.linearIncomeParticulars.length, this.profitLoss.linearExpenseParticulars.length);
      this.total = Number(this.profitLoss.creditTotal) + Number(this.profitLoss.creditTotal);
      this.loading=false;
    });

  }
}
