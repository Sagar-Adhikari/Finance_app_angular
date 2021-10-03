import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { AccountModel } from 'src/app/models/account.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as TransactionActions from '../../../actions/transaction.action';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, distinct } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.css']
})
export class AccountSelectorComponent implements OnInit {

  public accounts: AccountModel[];
  public selectedAccount: AccountModel;

  constructor(private commonService: CommonService, private store: Store<AppState>) { }

  selectorForm:FormControl = new FormControl();

  filteredOptionsObs: Observable<AccountModel[]>;

  private _filter(value: string ): AccountModel[] {
    const filterValue = value.toLowerCase() ;
    return this.accounts.filter(option =>option.accName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterById(value:number ): AccountModel[] {
    const filterValue = value.toString();
    return this.accounts.filter(option =>option.accID.toString().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  this.commonService.getAccounts().subscribe(lsA => {
    var lsAccounts = lsA as AccountModel[];
    this.accounts = lsAccounts.sort((a, b) => a.accName > b.accName ? 1 : -1);
    this.filteredOptionsObs = this.selectorForm.valueChanges.pipe(
      startWith(''),
      map(value =>{
        if(parseInt(value))
          return this._filterById(value)
        else
          return this._filter(value)
        }),
      );
  })

  }

  changedSelection(selectedVal: MatAutocompleteSelectedEvent) {
    var selectedIndex = this.accounts.findIndex(p => p.accName == selectedVal.option.value);
    this.selectedAccount = this.accounts[selectedIndex];
    if(selectedIndex > -1) {
      this.store.dispatch(TransactionActions.setSelectedAcc({payload: this.accounts[selectedIndex]}));
    }
  }

}
