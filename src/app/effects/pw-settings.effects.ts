import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as SettingsActions from '../actions/pw-settings.action';
import { switchMap, map, catchError, tap, } from 'rxjs/operators';
import { ProgressIndicatiorService } from '../providers/progress-indicator.service';
import { SettingsService } from '../core/services/settings.service';
import { TblSngRegModel } from '../models/loan-settings-model';


@Injectable()
export class PwSettingsEffects {

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.getSettings),
      switchMap(() =>
        this.settingsServie.getSettings().pipe(
          map(resp => {
            var ls = resp as TblSngRegModel[];            
            return SettingsActions.getSettingsComplete({ payload: ls })
          }),
        )
      ),
    )
  );

  getNepaliDate$ = createEffect(() =>
    {
      return this.actions$.pipe(
        ofType(SettingsActions.getNepaliDate),
        switchMap(() =>
          this.settingsServie.getNepaliDate().pipe(
            map(resp => {
              var dt = resp as Date;            
              return SettingsActions.getNepaliDateComplete({ payload: dt })
            }),
          )
        ),
      );
    }
  );

  constructor(
    private settingsServie: SettingsService,
    private actions$: Actions,
  ) { }

}