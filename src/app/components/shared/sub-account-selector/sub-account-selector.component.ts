import { MatDialog } from '@angular/material/dialog';
import { NewSubAccountComponent } from './../../new-sub-account/new-sub-account.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SubAccount } from 'src/app/models/account.model';
import { CommonService } from 'src/app/core/services/common.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { MatSelectChange } from '@angular/material/select';
import * as TransactionActions from '../../../actions/transaction.action';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'sub-account-selector',
  templateUrl: './sub-account-selector.component.html',
  styleUrls: ['./sub-account-selector.component.css']
})
export class SubAccountSelectorComponent implements OnInit {
  public filteredSubAccounts: SubAccount[];
  public subAccounts: SubAccount[];
  public selectedSubAccount: SubAccount;
  private accID: number = -1;
  private newSubAccountId: number = 0;

  filteredOptionsObs: Observable<SubAccount[]>;
  selectorForm: FormControl = new FormControl();

  private _filter(value: string): SubAccount[] {
    if (value == null) {
      return;
    }
    const filterValue = value;
    return this.filteredSubAccounts.filter(option => option.subAccName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value: number): SubAccount[] {
    const filterValue = value.toString();
    return this.filteredSubAccounts.filter(option => option.subAccID.toString().indexOf(filterValue) === 0);
  }


  constructor(private reportService: CommonService, private store: Store<AppState>, public dialog: MatDialog) {
    this.store.select(state => state.transactionState)
      .subscribe(tS => {
        if (tS.selectedAcc != null && (this.selectedSubAccount == null || (tS.accSN != this.selectedSubAccount.accSN))) {
          this.selectorForm.reset();
          this.accID = tS.selectedAcc.accID;
          if (this.subAccounts != null && this.subAccounts.length > 0) {
            this.filteredOptionsObs = this.selectorForm.valueChanges.pipe(
              startWith(''),
              map(value => {
                if (parseInt(value))
                  return this._filterById(value)
                else
                  return this._filter(value)
              }),
            );
            var filteredSubAccounts = this.subAccounts.filter(function (subA) {
              return subA.accID == tS.selectedAcc.accID;
            });

            this.filteredSubAccounts = filteredSubAccounts.sort((a, b) => a.subAccName > b.subAccName ? 1 : -1);;
          }
          if (tS.newSubAccId != null) {
            this.newSubAccountId = tS.newSubAccId;
          }

        }
      });

  }

  ngOnInit(): void {

    this.loadSubAccounts();
  }

  loadSubAccounts() {
    var accId = this.accID;

    this.reportService.getSubAccounts().subscribe(lsA => {
      this.subAccounts = lsA as SubAccount[];

      var bankSubAccounts = this.subAccounts.filter(p => p.accID == 90);
      var nonBankSubAccounts = this.subAccounts.filter(p => p.accID != 90 && p.accID != 110 && p.accID != 80);
      this.store.dispatch(TransactionActions.setBankSubAccounts({ payload: bankSubAccounts }));
      this.store.dispatch(TransactionActions.setNonBankSubAccounts({ payload: nonBankSubAccounts }));

      if (this.newSubAccountId > 0) {
        if (this.subAccounts != null && this.subAccounts.length > 0) {
          var filteredSubAccounts = this.subAccounts.filter(function (subA) {
            return subA.accID == accId;
          });

          this.filteredSubAccounts = filteredSubAccounts.sort((a, b) => a.subAccName > b.subAccName ? 1 : -1);
          var selected = this.filteredSubAccounts.find(p => {
            p.subAccID == this.newSubAccountId;
          });
          this.selectedSubAccount = selected;

        }
      }
    });
  }

  changedSelection(selectedVal: MatAutocompleteSelectedEvent) {
    var selected = this.filteredSubAccounts.find(p => p.subAccName == selectedVal.option.value);
    this.selectedSubAccount = selected;
    if (selected != null) {
      this.store.dispatch(TransactionActions.setAccSN({ payload: selected.accSN }));
    }
  }

  addNewSubAccount() {
    const dialogRef = this.dialog.open(NewSubAccountComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
      } else if (result === 'saved') {
        this.loadSubAccounts();
      }
    });
  }

  keyPress(val: KeyboardEvent) {
    if(this.accID < 0) return;
    if (val.charCode === 0 || val.keyCode == 48) {
      this.addNewSubAccount();
    }
  }

}
