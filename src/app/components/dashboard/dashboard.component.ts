import { TodayTotalCashInCashOut } from './../../models/todayTotalCashInCashOut.model';
import { CommonService } from "src/app/core/services/common.service";
import { GlobalService } from "src/app/global.service";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { currentUser } from "../../selectors/user.selector";
import { AuthUser } from "../../models/authuser.model";
import { CurrentBankTotalView } from 'src/app/models/currentBankTotalView.model';
import { MatDialog } from '@angular/material/dialog';
import { CurrentBankTotalDialogComponent } from './current-bank-total-dialog/current-bank-total-dialog.component';
import { TblLogService } from 'src/app/core/services/tbllog.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  user: AuthUser;
  genderCount: any[];
  currentBankTotalLs: CurrentBankTotalView[];
  currentBankTotalAmt: string;
  todayTotalCashInCashOut:TodayTotalCashInCashOut[];
  todaysCash:string;
  cashOut:string;
  cashId:number;


  tblLogFetchHandler: number;
  constructor(
    private store: Store<AppState>,
    private globalService: GlobalService,
    private commonService: CommonService,
    public dialog: MatDialog,
  ) {
    this.globalService.setLayout({
      pageTitle: "Dashboard",
      allowFooter: false,
    });
    this.store.pipe(select(currentUser)).subscribe((user) => {
      if (user != null) {
        this.getTotalMemberCountByGender();
        this.getTotalOfCurrentBankAccount();
        this.getTotalTodaysCashINCashOUT();
      }
    });
  }

  ngOnInit(): void {
    var that = this;
    this.getTotalTodaysCashINCashOUT();
  }

  getTotalMemberCountByGender() {
    this.commonService.getTotalMeemberCountByGender().subscribe((x: any) => {
      this.genderCount = x;
    });
  }

  getTotalOfCurrentBankAccount() {
    this.commonService.getTotalOfCurrentBankAccount().subscribe((resp) => {
      this.currentBankTotalLs = resp as CurrentBankTotalView[];
      if (this.currentBankTotalLs == null || this.currentBankTotalLs.length == 0) {
        this.currentBankTotalAmt = "0.0";
        return;
      }
      var totalAmt = this.currentBankTotalLs.map(item => item.total).reduce((prev, next) => prev + next);
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR',
      });
      this.currentBankTotalAmt = formatter.format(totalAmt);
    });
  }

  displayCurrentBankAccountTotals() {
    this.dialog.open(CurrentBankTotalDialogComponent,
      {
        disableClose: false,
        data: {
          currentBankTotalLs: this.currentBankTotalLs
        }
      });
  }

  getTotalTodaysCashINCashOUT() {
    this.commonService.getTotalTodaysCashINCashOUT().subscribe((resp) => {
      this.todayTotalCashInCashOut = resp as TodayTotalCashInCashOut[];
      if (this.todayTotalCashInCashOut == null || this.todayTotalCashInCashOut.length == 0) {
        this.todaysCash = "0.0";
        this.cashId =+ "0.0";
        this.cashOut = "0.0";
        return;
      }
     this.todayTotalCashInCashOut.map(item => item).forEach(item=>{
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NPR',
      });
      this.todaysCash = formatter.format(item.todaysCash);
      this.cashOut = formatter.format(item.cashOut);
      this.cashId = item.cashId;
    });
  });
  }


}
