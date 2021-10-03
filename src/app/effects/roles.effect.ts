import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as RolesActions from '../actions/role.action';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from '../core/services/roles.service';
import { Role } from '../models/role';


@Injectable()
export class RolesEffects {

  getRolesUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RolesActions.loadRoles),
      switchMap(() =>
        this.rolesService.getAllRoles().pipe(
          map(resp => {
            var roles = resp as Role[];
            return RolesActions.loadRolesComplete({ payload: roles });
          }),

          catchError((error: HttpErrorResponse) => {

            console.log(error);
            return of(RolesActions.loadRolesFailed({ errorMessage: error.message }));

          })
        )
      )
    )
  );

  createRoles$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RolesActions.createNewRole),
    switchMap((action) =>
      this.rolesService.createNewRole(action.payload).pipe(
        map((resp: any) => {
          var role = resp as Role;
          this.snackBar.open("New Role Created", "", {
            duration: 2000,
            panelClass: 'success-message'
          });
          this.router.navigate(['/roles']);
          return RolesActions.createNewRoleComplete({ payload: role});
        },
        ),
        catchError((error: HttpErrorResponse) => {

          
          if (error.status == 401) {
            this.snackBar.open("Incorrect username or password.", "", {
              duration: 2000,
              panelClass: 'error-message'
            });
          } else if(error.status == 400){
            //some other error occured here...
            this.snackBar.open(error.error.error, "", {
              duration: 2000,
              panelClass: 'error-message'
            });
          }

          console.log(error);
          return of(RolesActions.createNewRoleFailed({ errorMessage: error.message }));
        })
      )
    )
  )
);

deleteRole$ = createEffect(() =>
this.actions$.pipe(
  ofType(RolesActions.deleteRole),
  switchMap((action) =>
    this.rolesService.deleteRole(action.payload).pipe(
      map((resp: any) => {
        this.snackBar.open("Role deleted", "", {
          duration: 2000,
          panelClass: 'success-message'
        });
        this.router.navigate(['/roles']);
        
        return RolesActions.deleteRoleComplete({ payload: action.payload});
      },
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.snackBar.open("Incorrect username or password.", "", {
            duration: 2000,
            panelClass: 'error-message'
          });
        } else if(error.status == 400){
          //some other error occured here...
          this.snackBar.open(error.error.error, "", {
            duration: 2000,
            panelClass: 'error-message'
          });
        }

        console.log(error);
        this.snackBar.open("Error", "", {
          duration: 2000,
          panelClass: 'error-message'
        });
        return of(RolesActions.deleteRoleFailed({ errorMessage: error.message }));
      })
    )
  )
)
);

  constructor(
    private rolesService: RolesService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

}