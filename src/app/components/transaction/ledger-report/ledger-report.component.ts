import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionLedgerView } from '../models/transaction.model';

@Component({
  selector: 'app-ledger-report',
  templateUrl: './ledger-report.component.html',
  styleUrls: ['./ledger-report.component.css']
})
export class LedgerReportComponent implements OnInit {

  public lsTransactions: TransactionLedgerView[];

  displayedColumns: string[] = ['sn', 'dated', 'particulars', 'brNo', 'checkNo', 'drAmt', 'crAmt', 'balance', 'drCr', 'remarks'];

  constructor(private dialog: MatDialogRef<LedgerReportComponent>,
    @Inject(MAT_DIALOG_DATA) public getdata: any) {
    this.lsTransactions = this.getdata.ledgerData;
    console.log('this.lsTransactions: ', this.lsTransactions);
  }

  ngOnInit(): void {
  }

}
