import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';
import { LoanSettingsModel, TblSngRegModel } from 'src/app/models/loan-settings-model';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import * as SettingsActions from "../../../actions/pw-settings.action";
import { SettingsService } from 'src/app/core/services/settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loan-settings',
  templateUrl: './loan-settings.component.html',
  styleUrls: ['./loan-settings.component.css']
})
export class LoanSettingsComponent implements OnInit {

  loanCodes: Array<number> = [4, 5, 6, 7, 8, 11, 13, 24, 27, 39, 43, 44, 45];

  autoHarjanaOptions: string[] = ['No Auto Harjana', 'Calculate Harjana wrt Loan Rate', 'Calculate Harjana Monthwise regarding with Bha Na Days'];

  loanSettings: TblSngRegModel[];
  toUpdateRegValues: Array<TblSngRegModel> = [];
  originalLoanSettingsModel: LoanSettingsModel = new LoanSettingsModel();

  loanSettingsModel: LoanSettingsModel = new LoanSettingsModel();;
  loading: boolean = true;

  constructor(private store: Store<AppState>, private settingsService: SettingsService, private snackBar: MatSnackBar,private globalService:GlobalService) {
    this.globalService.setLayout({pageTitle:'Loan Setting',allowFooter:false});
   }

  ngOnInit(): void {

    this.store.select(state => state.settings)
      .subscribe(
        settingsState => {
          if (settingsState.regModels != null) {
            var all = settingsState.regModels;
            this.loanSettings = all.filter((v) => {
              if (this.isLoanSetting(v.regCode)) {
                return v;
              }
            });
            this.buildLoanSettingModel();
            this.loading = false;
          }
        }

      );
  }

  isLoanSetting(code: number): boolean {
    return this.loanCodes.includes(code);
  }

  buildToUpdate(value: any, regCode: number, isBoolean: boolean, ) {
    var reg = this.loanSettings.find(p => p.regCode == regCode);
    if (reg == null) return;
    if (isBoolean) {
      reg.regValue = value == true ? "1" : "0";
    } else {
      reg.regValue = value.toString();
    }
    this.toUpdateRegValues.push(reg);
  }

  saveSettings() {
    if (this.loanSettingsModel.assumeGataByajForPrevYear != null
      && this.loanSettingsModel.assumeGataByajForPrevYear != this.originalLoanSettingsModel.assumeGataByajForPrevYear) {
      //todo: get reg code remaining...
    }

    if (this.loanSettingsModel.autoChutCalculation != null
      && this.loanSettingsModel.autoChutCalculation != this.originalLoanSettingsModel.autoChutCalculation) {
      this.buildToUpdate(this.loanSettingsModel.autoChutCalculation, 11, true);
    }

    if (this.loanSettingsModel.autoHarjanaOnHassets != null
      && this.loanSettingsModel.autoHarjanaOnHassets != this.originalLoanSettingsModel.autoHarjanaOnHassets) {
      this.buildToUpdate(this.loanSettingsModel.autoHarjanaOnHassets, 8, false);
    }

    if (this.loanSettingsModel.changeInterestRateBy != null
      && this.loanSettingsModel.changeInterestRateBy != this.originalLoanSettingsModel.changeInterestRateBy) {
      this.buildToUpdate(this.loanSettingsModel.changeInterestRateBy, 43, false);
    }

    if (this.loanSettingsModel.changeInterestRateWithinDays != null
      && this.loanSettingsModel.changeInterestRateWithinDays != this.originalLoanSettingsModel.changeInterestRateWithinDays) {
      this.buildToUpdate(this.loanSettingsModel.changeInterestRateWithinDays, 44, false);
    }

    if (this.loanSettingsModel.changeInterestRateWithinDaysFrom != null
      && this.loanSettingsModel.changeInterestRateWithinDaysFrom != this.originalLoanSettingsModel.changeInterestRateWithinDaysFrom) {
      this.buildToUpdate(this.loanSettingsModel.changeInterestRateWithinDaysFrom, 45, false);
    }

    if (this.loanSettingsModel.chutPercentForAsalRini != null
      && this.loanSettingsModel.chutPercentForAsalRini != this.originalLoanSettingsModel.chutPercentForAsalRini) {
      this.buildToUpdate(this.loanSettingsModel.chutPercentForAsalRini, 5, false);
    }

    if (this.loanSettingsModel.clearByajDuringDailyLoanEntry != null
      && this.loanSettingsModel.clearByajDuringDailyLoanEntry != this.originalLoanSettingsModel.clearByajDuringDailyLoanEntry) {
      //todo: get reg code remaining...
    }

    if (this.loanSettingsModel.enableFirstDateAsByajDate != null
      && this.loanSettingsModel.enableFirstDateAsByajDate != this.originalLoanSettingsModel.enableFirstDateAsByajDate) {
      this.buildToUpdate(this.loanSettingsModel.enableFirstDateAsByajDate, 27, true);
    }

    if (this.loanSettingsModel.enableOptionOfRinMagFaram != null
      && this.loanSettingsModel.enableOptionOfRinMagFaram != this.originalLoanSettingsModel.enableOptionOfRinMagFaram) {
      //todo: get reg code remaining...
    }

    if (this.loanSettingsModel.harjanaChutDin != null
      && this.loanSettingsModel.harjanaChutDin != this.originalLoanSettingsModel.harjanaChutDin) {
      this.buildToUpdate(this.loanSettingsModel.harjanaChutDin, 4, false);
    }

    if (this.loanSettingsModel.includeByajIntoSanwa != null
      && this.loanSettingsModel.includeByajIntoSanwa != this.originalLoanSettingsModel.includeByajIntoSanwa) {
      //todo: get reg code remaining...
    }

    if (this.loanSettingsModel.keepMidTypeRate != null
      && this.loanSettingsModel.keepMidTypeRate != this.originalLoanSettingsModel.keepMidTypeRate) {
      this.buildToUpdate(this.loanSettingsModel.keepMidTypeRate, 7, true);
    }

    if (this.loanSettingsModel.mergeHarjanaAndByaj != null
      && this.loanSettingsModel.mergeHarjanaAndByaj != this.originalLoanSettingsModel.mergeHarjanaAndByaj) {
      this.buildToUpdate(this.loanSettingsModel.mergeHarjanaAndByaj, 13, true);
    }

    if (this.loanSettingsModel.percentSkChhut != null
      && this.loanSettingsModel.percentSkChhut != this.originalLoanSettingsModel.percentSkChhut) {
      this.buildToUpdate(this.loanSettingsModel.percentSkChhut, 24, false);
    }

    if (this.loanSettingsModel.useAutoBachatHarjana != null
      && this.loanSettingsModel.useAutoBachatHarjana != this.originalLoanSettingsModel.useAutoBachatHarjana) {
      //todo: get reg code remaining...

    }

    if (this.loanSettingsModel.viewLoanMemberIdwise != null
      && this.loanSettingsModel.viewLoanMemberIdwise != this.originalLoanSettingsModel.viewLoanMemberIdwise) {
      this.buildToUpdate(this.loanSettingsModel.viewLoanMemberIdwise, 39, true);
    }

    if (this.loanSettingsModel.wholeSanwaHarjana != null
      && this.loanSettingsModel.wholeSanwaHarjana != this.originalLoanSettingsModel.wholeSanwaHarjana) {
      this.buildToUpdate(this.loanSettingsModel.wholeSanwaHarjana, 6, true);
    }

    if (this.toUpdateRegValues != null && this.toUpdateRegValues.length > 0) {
      this.loading = true;

      this.settingsService.updateSettings(this.toUpdateRegValues).subscribe((resp: any) => {

        this.loading = false;
        this.snackBar.open("Settings saved.", "", {
          duration: 2000,
          panelClass: 'success-message'
        });
        this.store.dispatch(
          SettingsActions.getSettingsComplete({ payload: resp as TblSngRegModel[] })
        );

      }, error => {
        this.snackBar.open("Error when saving settings.", "", {
          duration: 2000,
          panelClass: 'error-message'
        });
        this.loading = false;
        console.log(error);
      });
    }
  }

  buildLoanSettingModel() {

    var harjanaChhut = this.loanSettings.find(p => p.regCode == 4);
    if (harjanaChhut != null) {
      this.loanSettingsModel.harjanaChutDin = (+harjanaChhut.regValue);
    }
    var chhutPercentForAsalRini = this.loanSettings.find(p => p.regCode == 5);
    if (chhutPercentForAsalRini != null) {
      this.loanSettingsModel.chutPercentForAsalRini = (+chhutPercentForAsalRini.regValue);
    }
    var wholeSanwaHarjana = this.loanSettings.find(p => p.regCode == 6);
    if (wholeSanwaHarjana != null) {
      this.loanSettingsModel.wholeSanwaHarjana = (+wholeSanwaHarjana.regValue) > 0;
    }
    var keepMidTypeRate = this.loanSettings.find(p => p.regCode == 7);
    if (keepMidTypeRate != null) {
      this.loanSettingsModel.keepMidTypeRate = (+keepMidTypeRate.regValue) > 0;
    }
    var autoHarjanaOnLoan = this.loanSettings.find(p => p.regCode == 8);
    if (autoHarjanaOnLoan != null) {
      this.loanSettingsModel.autoHarjanaOnHassets = (+autoHarjanaOnLoan.regValue);
    }

    var autoChhutCalc = this.loanSettings.find(p => p.regCode == 11);
    if (autoChhutCalc != null) {
      this.loanSettingsModel.autoChutCalculation = (+autoChhutCalc.regValue) > 0;
    }

    var mergeHarjanaAndByaj = this.loanSettings.find(p => p.regCode == 13);
    if (mergeHarjanaAndByaj != null) {
      this.loanSettingsModel.mergeHarjanaAndByaj = (+mergeHarjanaAndByaj.regValue) > 0;
    }

    var percentSkChhut = this.loanSettings.find(p => p.regCode == 24);
    if (percentSkChhut != null) {
      this.loanSettingsModel.percentSkChhut = (+percentSkChhut.regValue);
    }

    var enableFirstDateAsByajDate = this.loanSettings.find(p => p.regCode == 27);
    if (enableFirstDateAsByajDate != null) {
      this.loanSettingsModel.enableFirstDateAsByajDate = (+enableFirstDateAsByajDate.regValue) > 0;
    }

    var viewLoanMemberIdWise = this.loanSettings.find(p => p.regCode == 39);
    if (viewLoanMemberIdWise != null) {
      this.loanSettingsModel.viewLoanMemberIdwise = (+viewLoanMemberIdWise.regValue) > 0;
    }

    var changeInterestRateBy = this.loanSettings.find(p => p.regCode == 43);
    if (changeInterestRateBy != null) {
      this.loanSettingsModel.changeInterestRateBy = (+changeInterestRateBy.regValue);
    }
    var changeInterestRateWithinDays = this.loanSettings.find(p => p.regCode == 44);
    if (changeInterestRateWithinDays != null) {
      this.loanSettingsModel.changeInterestRateWithinDays = (+changeInterestRateWithinDays.regValue);
    }
    var changeInterestRateWithinDaysFrom = this.loanSettings.find(p => p.regCode == 45);
    if (changeInterestRateWithinDaysFrom != null) {
      this.loanSettingsModel.changeInterestRateWithinDaysFrom = (+changeInterestRateWithinDaysFrom.regValue);
    }

    this.originalLoanSettingsModel = Object.assign({}, this.loanSettingsModel);
  }
}
