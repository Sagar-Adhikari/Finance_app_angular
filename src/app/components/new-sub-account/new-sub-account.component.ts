import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { NewSubAccountModel } from 'src/app/models/account.model';
import * as TransactionActions from '../../actions/transaction.action';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-new-sub-account',
  templateUrl: './new-sub-account.component.html',
  styleUrls: ['./new-sub-account.component.css']
})
export class NewSubAccountComponent implements OnInit {
  public accountId: number;
  public newModel: NewSubAccountModel;

  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<NewSubAccountComponent>, private store: Store<AppState>,private transactionService: TransactionService) {
    this.store.select(state => state.transactionState)
      .subscribe(tS => {
        this.newModel = new NewSubAccountModel(tS.selectedAcc.accID);        
      });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  createNew() {
    this.transactionService.createNewSubAccount(this.newModel).subscribe((resp: any)=> {      
      var value = resp as number;
      if (value > 0) {
        this.store.dispatch(TransactionActions.setNewSubAccId({payload: value}));
        this.globalService.showMessageSuccess('Created new sub account successfully.');
        this.dialogRef.close('saved');
      } else {
        this.globalService.showMessageError('Unable to create new sub account.');
      }
      
    }, err => {
      console.log('error resp from sub account create');
      console.log(err);
      this.globalService.showMessageError('Unable to create new sub account.');
    });
  }

}
