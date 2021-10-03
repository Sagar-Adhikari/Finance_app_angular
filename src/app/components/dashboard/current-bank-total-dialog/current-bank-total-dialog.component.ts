import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrentBankTotalView } from 'src/app/models/currentBankTotalView.model';

@Component({
  selector: 'app-current-bank-total-dialog',
  templateUrl: './current-bank-total-dialog.component.html',
  styleUrls: ['./current-bank-total-dialog.component.css']
})
export class CurrentBankTotalDialogComponent implements OnInit {

  currentBankTotalLs: CurrentBankTotalView[];
  displayedColumns: string[] = ['branchCode', 'subAccName', 'total'];

  constructor(private dialog: MatDialogRef<CurrentBankTotalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public getdata: any) { 
      this.currentBankTotalLs = this.getdata.currentBankTotalLs;
    }

  ngOnInit(): void {
  }

}
