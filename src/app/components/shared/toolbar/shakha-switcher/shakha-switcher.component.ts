import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as SettingsActions from '../../../../actions/pw-settings.action';
import { MatDialogRef } from '@angular/material/dialog';
import { ShakhaSelectorComponent } from '../../shakha-selector/shakha-selector.component';
import { SelectedShakhaModel } from 'src/app/models/shakha-model';

@Component({
  selector: 'app-shakha-switcher',
  templateUrl: './shakha-switcher.component.html',
  styleUrls: ['./shakha-switcher.component.css']
})
export class ShakhaSwitcherComponent implements OnInit {
  @ViewChild("shakha") shakhaRef: ShakhaSelectorComponent;

  constructor(
    public dialogRef: MatDialogRef<ShakhaSwitcherComponent>,
    private store: Store<AppState>,) {
  }

  ngOnInit(): void {
  }

  changeShakha() {
    var shakhaId = (this.shakhaRef.shakha == undefined)
      ? -1 : this.shakhaRef.shakha.shakhaID;
    if (shakhaId > -1) {
      this.store.dispatch(
        SettingsActions.updateSelectedShakha({
          payload: new SelectedShakhaModel(shakhaId, this.shakhaRef.shakha.shakhaName)
        })
      );
      this.dialogRef.close('success');
    }
  }

}
