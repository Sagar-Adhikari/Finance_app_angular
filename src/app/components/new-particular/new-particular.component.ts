import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { NewParticularModel } from 'src/app/models/particular.model';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { GlobalService } from 'src/app/global.service';
import * as TransactionActions from '../../actions/transaction.action';

@Component({
  selector: 'app-new-particular',
  templateUrl: './new-particular.component.html',
  styleUrls: ['./new-particular.component.css']
})
export class NewParticularComponent implements OnInit {

  public newModel: NewParticularModel;
  public selectedDrLock: string = 'debit';


  constructor(
    private globalService: GlobalService,
    public dialogRef: MatDialogRef<NewParticularComponent>,
    private store: Store<AppState>,
    private transactionService: TransactionService) {
    this.store.select(state => state.transactionState)
      .subscribe(tS => {
        this.newModel = new NewParticularModel(
          '', '', tS.accSN, tS.selectedAcc.accID, true
        );
      });
  }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close('cancel');
  }

  createNew() {
    this.newModel.drLock = this.selectedDrLock == 'debit' ? true: false;
    this.transactionService.createNewParticular(this.newModel).subscribe((resp: any)=> {
      var value = resp as number;
      console.log('response new particular:',resp)
      if (value > 0) {
        this.store.dispatch(TransactionActions.setNewParticulId({payload: value}));
        this.globalService.showMessageSuccess('Created new particular successfully.');
        this.dialogRef.close('saved');
      } else {
        this.globalService.showMessageError('Unable to create new particular.');
      }

    }, err => {
      console.log('error resp from particular create');
      console.log(err);
      this.globalService.showMessageError('Unable to create new particular.');
    });
  }

}
