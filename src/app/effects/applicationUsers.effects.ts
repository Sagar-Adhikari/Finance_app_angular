import { Injectable } from "@angular/core";
import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as ApplicationUserActions from '../actions/applicationUser.action';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../core/services/user.service';
import { ApplicationUser } from '../models/applicationUser.model';
import { NewUser } from '../models/newUser.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginationView } from '../models/api-reponse.model';


@Injectable()
export class ApplicationUsersEffects {

  getApplicationUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationUserActions.loadUsers),
      switchMap((action) =>
        this.userService.getAllUsers(action.page, action.limit).pipe(
          map(resp => {
            var users = resp as PaginationView<ApplicationUser>;
            return ApplicationUserActions.loadUsersComplete({ payload: users });
          }),

          catchError((error: HttpErrorResponse) => {

            console.log(error);
            return of(ApplicationUserActions.loadusersFailed({ errorMessage: error.message }));

          })
        )
      )
    )
  );

  createtApplicationUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ApplicationUserActions.createNewUser),
    switchMap((action) =>
      this.userService.createNewUser(action.payload).pipe(
        map((resp: any) => {
          var user = resp as ApplicationUser;
          this.snackBar.open("New User Created Successfully", "", {
            duration: 2000,
            panelClass: 'success-message'
          });
          this.router.navigate(['/users']);
          return ApplicationUserActions.createNewComplete({ payload: user});
        },
        ),
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.snackBar.open("Incorrect username or password.", "", {
              duration: 2000,
              panelClass: 'error-message'
            });
          } else {
            //some other error occured here...
            this.snackBar.open(error.error, "", {
              duration: 2000,
              panelClass: 'error-message'
            });
            
          }
  
          console.log(error);
          return of(ApplicationUserActions.createNewFailed({ errorMessage: error.message }));
        })
      )
    )
  )
);

updateApplicationUsers$ = createEffect(() =>
this.actions$.pipe(
  ofType(ApplicationUserActions.updateUser),
  switchMap((action) =>
    this.userService.updateUser(action.id, action.payload).pipe(
      map((resp: any) => {
        var user = resp as ApplicationUser;
        this.snackBar.open("User Updated", "", {
          duration: 2000,
          panelClass: 'success-message'
        });
        this.router.navigate(['/users']);
        return ApplicationUserActions.updateUserComplete({ payload: user});
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
        return of(ApplicationUserActions.updateUseFailed({ errorMessage: error.message }));
      })
    )
  )
)
);

deleteUser$ = createEffect(() =>
this.actions$.pipe(
  ofType(ApplicationUserActions.deleteUser),
  switchMap((action) =>
    this.userService.deleteUser(action.payload).pipe(
      map(resp => {
        this.snackBar.open("User deleted", "", {
          duration: 2000,
          panelClass: 'success-message'
        });
        this.router.navigate(['/users']);
        
        return ApplicationUserActions.deleteUserCompleted({ payload: action.payload});
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
        return of(ApplicationUserActions.deleteUserFailed({ errorMessage: error.message }));
      })
    )
  )
)
);


  constructor(
    private userService: UserService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

}