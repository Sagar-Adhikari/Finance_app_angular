import { AddNewMemberComponent } from './../new-member/add-new-member/add-new-member.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { MemberService } from 'src/app/core/services/member.service';
import { MemberTransactionView } from 'src/app/models/member.model';
import { MatDialog } from '@angular/material/dialog';
import { NewSubAccountComponent } from '../new-sub-account/new-sub-account.component';
import { NewParticularComponent } from '../new-particular/new-particular.component';
import { ParticularSelectorComponent } from '../shared/particular-selector/particular-selector.component';
import { SubAccountSelectorComponent } from '../shared/sub-account-selector/sub-account-selector.component';
import { NewMemberComponent } from '../new-member/new-member.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { SearchTransactionLedgerView, TransactionLedgerView, NewTransactionData, CheckTransactionModel } from './models/transaction.model';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LedgerReportComponent } from './ledger-report/ledger-report.component';
import { SubAccount } from 'src/app/models/account.model';
import { ParticularModel } from 'src/app/models/particular.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DepositSlipComponent } from './deposit-slip/deposit-slip.component';
import * as TransactionActions from '../../actions/transaction.action';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  @ViewChild("account") accountRef;
  @ViewChild("subAccount") subAccountRef: SubAccountSelectorComponent;
  @ViewChild("particular") particularRef: ParticularSelectorComponent;

  public newTransactionData: NewTransactionData;
  public members: MemberTransactionView[];
  public selectedMember: MemberTransactionView;
  public accountId: number = 0;
  public accSN: number = 0;
  public ac1IsBank: boolean = false;
  public selectedTransactionType: string;
  public bankSubAccounts: SubAccount[];
  public nonBankSubAccounts: SubAccount[];
  public nonCashSubAccounts: SubAccount[];
  public selectedNonCashSubAccount: SubAccount;
  private selectedParticular: ParticularModel;

  public memberImagePath: string;
  public memberSign1Path: string;
  public memberSign2Path: string;
  private todayNepaliDt: string;
  private todayNepaliYear: string;
  private todayNepaliMonth: string;
  private startDateNepali: string;

  public loading: boolean;
  public saving: boolean;
  public isDisable: boolean = true;

  public drLockParticular: boolean = true;
  public isTransactionBank: boolean = true;

  constructor(
    private globalService: GlobalService,
    private memberService: MemberService,
    private transactionService: TransactionService,
    public dialog: MatDialog,
    private store: Store<AppState>,) {
    this.loading = false;
    this.newTransactionData = new NewTransactionData();
    this.newTransactionData.transaction1CheckInfo = new CheckTransactionModel();
    this.newTransactionData.transaction2CheckInfo = new CheckTransactionModel();
    this.store.select(state => state.transactionState)
      .subscribe(tS => {
        this.accountId = tS.selectedAcc == null ? 0 : tS.selectedAcc.accID;
        this.accSN = tS.accSN == null ? 0 : tS.accSN;
        this.ac1IsBank = false;
        if (tS.selectedAcc != null) {
          this.ac1IsBank = tS.selectedAcc.accName == "Bank A/C";
        }
        if (tS.selectedParticular != null) {
          this.drLockParticular = tS.selectedParticular.drLock;
          this.selectedParticular = tS.selectedParticular;
        } else {
          this.selectedParticular = null;
        }

        this.bankSubAccounts = tS.lsBankSubAccounts;
        this.nonBankSubAccounts = tS.lsNonBankSubAccounts;
        this.nonCashSubAccounts = this.bankSubAccounts;
      });

    this.store.select(state => state.settings)
      .subscribe(
        settingsState => {
          if (settingsState.nepaliDate != null) {
            var dt = new Date(settingsState.nepaliDate);
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;//js getMonth month begins from 0.
            var day = dt.getDate();
            this.startDateNepali = year + '/01/01';
            this.newTransactionData.bachatYear = year.toString();
            this.newTransactionData.bachatMonth = month.toString().padStart(2, '0');
            console.log(this.newTransactionData);
            this.todayNepaliDt = year + '/' + month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0');
          }
        }

      );
    this.globalService.setLayout({ pageTitle: 'Transactions', allowFooter: false });
    this.memberService.getMembersForTransaction().subscribe((resp: any) => {
      this.members = resp as MemberTransactionView[];
      this.members = this.members.sort((a, b) => a.memFName > b.memFName ? 1 : -1);
    })
  }

  ngOnInit(): void {
    this.selectedTransactionType = 'cash';
  }

  addNewSubAccount() {
    const dialogRef = this.dialog.open(NewSubAccountComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
      } else if (result === 'saved') {
        this.subAccountRef.loadSubAccounts();
      }
    });
  }

  addNewParticular() {
    const dialogRef = this.dialog.open(NewParticularComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
      } else if (result === 'saved') {
        this.particularRef.loadParticulars();
      }
    });
  }


  addNewMembers() {
    const dialogRef = this.dialog.open(AddNewMemberComponent,
      {
        height: '100%',
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
      } else if (result === 'saved') {
      }
    });
  }

  changeTransactionType(e: MatRadioChange) {
    this.selectedTransactionType = e.value;
    this.newTransactionData.isTransactionCash = e.value == 'cash';
    if (!this.newTransactionData.isTransactionCash) {
      this.nonCashSubAccounts = this.isTransactionBank ? this.bankSubAccounts : this.nonBankSubAccounts;
    }
  }

  onMemberChanged(e: MatSelectChange) {
    this.selectedMember = e.value;
    this.memberImagePath = "data:image/png;base64," + this.selectedMember.photoUrl;
    this.memberSign1Path = "data:image/png;base64," + this.selectedMember.sig1Url;
    this.memberSign2Path = "data:image/png;base64," + this.selectedMember.sig2Url;
  }

  searchMemberLedger() {
    this.loading = true;
    var searchModel = this.getBasicSearchModel();
    this.transactionService.getMemberLedger(searchModel).subscribe((resp: any) => {
      var ls = resp as TransactionLedgerView[];
      this.loading = false;
      const dialogRef = this.dialog.open(LedgerReportComponent,
        {
          disableClose: false,
          data: {
            ledgerData: ls
          }
        });

    }, (err: HttpErrorResponse) => {
      console.log('error');
      console.log(err);
      this.globalService.showMessageError(err.message);
      this.loading = false;
    });
  }

  getBasicSearchModel(): SearchTransactionLedgerView {
    var searchModel = new SearchTransactionLedgerView();
    searchModel.accID = this.accountId;
    searchModel.accSN = this.accSN;
    searchModel.memID = this.selectedMember?.memID;
    searchModel.datedEnd = this.todayNepaliDt;
    searchModel.datedStart = this.startDateNepali;
    return searchModel;
  }

  searchAccountLedger17() {
    this.loading = true;
    var searchModel = this.getBasicSearchModel();
    this.transactionService.getAccountLedger(searchModel).subscribe((resp: any) => {
      var ls = resp as TransactionLedgerView[];
      this.loading = false;
      const dialogRef = this.dialog.open(LedgerReportComponent,
        {
          disableClose: false,
          data: {
            ledgerData: ls
          }
        });

    }, (err: HttpErrorResponse) => {
      console.log('error');
      console.log(err);
      this.globalService.showMessageError(err.message);
      this.loading = false;
    });
  }

  searchAccountLedger30() {
    this.loading = true;
    var searchModel = this.getBasicSearchModel();
    this.transactionService.getAccountLedger(searchModel).subscribe((resp: any) => {
      var ls = resp as TransactionLedgerView[];
      this.loading = false;
      const dialogRef = this.dialog.open(LedgerReportComponent,
        {
          disableClose: false,
          data: {
            ledgerData: ls
          }
        });

    }, (err: HttpErrorResponse) => {
      console.log('error');
      console.log(err);
      this.globalService.showMessageError(err.message);
      this.loading = false;
    });
  }

  saveTransaction() {
    // this.isEnable=false;
    this.newTransactionData.transaction1CheckInfo.accSN = this.accSN;
    this.newTransactionData.particuID = this.particularRef?.selectedParticular?.particuID;
    this.newTransactionData.memSN = this.selectedMember?.sn;
    this.newTransactionData.datedN = this.todayNepaliDt;
    this.newTransactionData.clrDateN = this.todayNepaliDt;
    this.saving = true;

    if (!this.newTransactionData.isTransactionCash) {
      this.newTransactionData.transaction2CheckInfo.accSN = this.selectedNonCashSubAccount.accSN;
    }
    this.transactionService.createNewTransaction(this.newTransactionData).subscribe((resp: any) => {
      console.log('response:', resp);
      var value = resp as number;
      if (value > 0) {
        this.store.dispatch(TransactionActions.setNewTSN({ payload: value }));
        this.globalService.showMessageInfo('Saved new transaction!');
        this.isDisable = false;
      } else {
        this.globalService.showMessageError('Unable to save transaction.');

      }

      this.saving = false;
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.saving = false;
      this.isDisable = true;
      this.globalService.showMessageError(err.error);
    });
  }

  changedBankSubAccountSelection(e: MatSelectChange) {
    this.selectedNonCashSubAccount = e.value;
  }

  saveTransactionDisabled(): boolean {
    return this.saving || this.selectedMember === null || this.selectedParticular === null;
  }

  changeBankTransaction(e: MatCheckboxChange) {
    this.isTransactionBank = e.checked;
    this.nonCashSubAccounts = e.checked ? this.bankSubAccounts : this.nonBankSubAccounts;
  }

  printTransaction() {
    this.store.select(state => state.transactionState).subscribe(tS => {
      if (tS.newTSN) {
        const dialogRef = this.dialog.open(DepositSlipComponent,
          {
            disableClose: false,
          });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 'error') {
          } else if (result === 'saved') {

          }
        });
      }

    });

  }
}

