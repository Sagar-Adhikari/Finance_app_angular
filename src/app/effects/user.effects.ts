import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, } from 'rxjs/operators';
import { AuthUser, } from '../models/authUser.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../core/services/user.service';
import { ProgressIndicatiorService } from '../providers/progress-indicator.service';
import * as SettingsActions from '../actions/pw-settings.action';
import { SelectedShakhaModel } from '../models/shakha-model';
import { Router } from '@angular/router';


@Injectable()
export class UserEffects {

  getAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      tap(() => this.prograssIndicatorService.show()),
      switchMap(() =>
        this.userService.getAuthUser().pipe(
          switchMap((resp) => {
            var user = resp as AuthUser;
            return [
              UserActions.loginComplete({ payload: user }),
              SettingsActions.updateSelectedShakha({ payload: new SelectedShakhaModel(user.shakhaId, user.shakha) }),
              SettingsActions.getNepaliDate()
            ]
          }),

          catchError((error: HttpErrorResponse) => {

            console.log(error);

            if (error.status == 401) {
              this.snackBar.open("Incorrect username or password.", "", {
                duration: 2000,
                panelClass: 'error-message'
              });
            } else {
              //some other error occured here...
              this.snackBar.open("Unable to sign in at this time.", "", {
                duration: 2000,
                panelClass: 'error-message'
              });

              return of(UserActions.loginFailure({ errorMessage: error.message }));
            }

            console.log("asldkjasdlkjasdlkajsd 2");
          })
        ),
      ),
      tap(() => this.prograssIndicatorService.hide()),
      tap(() => this.snackBar.open("Login successful.", "", {
        duration: 2000,
        panelClass: 'success-message'
      })),
      tap(() => this.router.navigate(['/dashboard']))
    )
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private prograssIndicatorService: ProgressIndicatiorService,
    private router: Router
  ) { }

}
