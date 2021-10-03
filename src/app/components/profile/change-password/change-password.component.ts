import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/form.validators';
import { ChangePasswordView } from 'src/app/models/authuser.model';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.minLength(6),]],
    newPassword: ['', [Validators.required, Validators.minLength(6),]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6),]],
  }, {
    validator: MustMatch('newPassword', 'confirmPassword')
  });

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private globalService:GlobalService
    ) {
      this.globalService.setLayout({pageTitle:'Change Password',allowFooter:true});
    }

  ngOnInit(): void {
  }

  async changePasswordSubmit() {
    var cpModel = new ChangePasswordView(
      this.changePasswordForm.value.currentPassword,
      this.changePasswordForm.value.newPassword,
      this.changePasswordForm.value.confirmPassword
    );

    this.userService.changePassword(cpModel).subscribe({
      next: data => {
        this.onChangeSucces();
        return;
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 200) {
          //error catches status 200 as well
          //todo: why?
          this.onChangeSucces();
          return;
        }
        //todo: update error message...
        if (error.status == 409) {
          //returned conflict from server.
        } else {
          //some other error occured here...
        }

        this.snackBar.open("Error changing password", "", {
          duration: 2000,
          panelClass: 'error-message'
        });
      }
    });
  }


  private onChangeSucces() {
    this.snackBar.open("Password changed successfully.", "", {
      duration: 2000,
      panelClass: 'success-message'
    });
    this.router.navigate(['user-profile']);
  }

}
