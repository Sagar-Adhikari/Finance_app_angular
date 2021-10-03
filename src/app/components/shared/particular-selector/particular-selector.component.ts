import { NewParticularComponent } from './../../new-particular/new-particular.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ParticularModel } from 'src/app/models/particular.model';
import { CommonService } from 'src/app/core/services/common.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import * as TransactionActions from '../../../actions/transaction.action';

@Component({
  selector: 'app-particular-selector',
  templateUrl: './particular-selector.component.html',
  styleUrls: ['./particular-selector.component.css']
})
export class ParticularSelectorComponent implements OnInit {

  public filteredParticulars: ParticularModel[];
  public particulars: ParticularModel[];
  public selectedParticular: ParticularModel;
  private accID: number = -1;
  private accSN: number = -1;
  private newParticuId: number = 0;

  particularSelectorForm = new FormControl();
  filteredOptionsObs: Observable<ParticularModel[]>;

  private _filter(value: string): ParticularModel[] {
    const filterValue = value.toLowerCase();

    return this.filteredParticulars.filter(option => option.particuName.toLowerCase().indexOf(filterValue) === 0);
  }


  constructor(private commonService: CommonService, private store: Store<AppState>,public dialog: MatDialog) {
    this.store.select(state => state.transactionState)
      .subscribe(tS => {
        if(tS.selectedParticular != null && this.selectedParticular.particuID == tS.selectedParticular.particuID) {
          return;
        }
        this.newParticuId = 0;
        this.particularSelectorForm.setValue('');
        this.particularSelectorForm.disable();
        if (tS.selectedAcc != null && tS.accSN != null) {
          this.accID = tS.selectedAcc.accID;
          this.accSN = tS.accSN;
          if (this.particulars != null && this.particulars.length > 0) {
            var filteredPs = this.particulars.filter(function (particular) {
              return (particular.accID == tS.selectedAcc.accID && particular.relatedAccSN == tS.accSN);
            });
            this.filteredParticulars = filteredPs.sort((a, b) => a.particuName > b.particuName ? 1 : -1);
            this.filteredOptionsObs = this.particularSelectorForm.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(value))
            );
          }

          this.particularSelectorForm.enable();
        } else {
          this.accID = -1;
          this.accSN = -1;
          this.filteredParticulars = [];
          this.filteredOptionsObs = null;
          this.particularSelectorForm.disable();
        }

        if (tS.newParticuId != null) {
          this.newParticuId = tS.newParticuId;
        }
      });
  }

  ngOnInit(): void {
    this.loadParticulars();
  }

  loadParticulars() {
    var accId = this.accID;
    var accSN = this.accSN;
    this.commonService.getParticulars().subscribe(lsA => {
      this.particulars = lsA as ParticularModel[];

      if (this.newParticuId > 0) {
        this.particularSelectorForm.enable();
        if (this.particulars != null && this.particulars.length > 0) {
          var filteredPs = this.particulars.filter(function (particular) {
            return (particular.accID == accId && particular.relatedAccSN == accSN);
          });
          this.filteredParticulars = filteredPs.sort((a, b) => a.particuName > b.particuName ? 1 : -1);
          var selected = this.filteredParticulars.find(p => p.particuID == this.newParticuId);
          this.selectedParticular = selected;
          this.store.dispatch(TransactionActions.setSelectedParticular({ payload: this.selectedParticular }));
          this.filteredOptionsObs = this.particularSelectorForm.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
          this.particularSelectorForm.setValue(selected.particuName);
        }
      }
    });
  }

  changedSelection(selectedVal: MatAutocompleteSelectedEvent) {
    var selectedIndex = this.filteredParticulars.findIndex(p => p.particuName == selectedVal.option.value);
    this.selectedParticular = this.filteredParticulars[selectedIndex];
    this.store.dispatch(TransactionActions.setSelectedParticular({ payload: this.selectedParticular }));
  }

  addNewParticular() {
    const dialogRef = this.dialog.open(NewParticularComponent,
      {
        disableClose: true,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'error') {
      } else if (result === 'saved') {
        this.loadParticulars();
      }
    });
  }

  keyPress(val:KeyboardEvent) {
    console.log('value::',val)
    if(val.charCode === 0 ||val.keyCode==48){
    this.addNewParticular();
    }
   }


}
