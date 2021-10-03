import { SubAccount } from './../../../models/account.model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { CommonService } from 'src/app/core/services/common.service';
import { Component, OnInit } from '@angular/core';
import * as TransactionActions from '../../../actions/transaction.action';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-sub-account-dd',
  templateUrl: './sub-account-dd.component.html',
  styleUrls: ['./sub-account-dd.component.css']
})
export class SubAccountDdComponent implements OnInit {
  public filteredSubAccounts: SubAccount[];
  public subAccounts: SubAccount[];
  public selectedSubAccount: SubAccount;

  constructor(private reportService: CommonService,) { }
  subAcc: SubAccount[];

  ngOnInit(): void {
    this.loadSubAccount();
  }

  loadSubAccount() {
    this.reportService.getSubAccounts().subscribe(lsA => {
      this.subAccounts = lsA as SubAccount[];
    });
  }

  changedSelection(selectedVal: MatAutocompleteSelectedEvent) {
    var selected = this.filteredSubAccounts.find(p => p.subAccName == selectedVal.option.value);
    this.selectedSubAccount = selected;
  }
}
