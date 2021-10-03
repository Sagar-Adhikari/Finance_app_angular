import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MustMatch } from 'src/app/shared/form.validators';
import { ChangePasswordView } from 'src/app/models/authuser.model';
import * as UserActions from 'src/app/actions/user.action'; import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';


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

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  async changePasswordSubmit() {
    var cpModel = new ChangePasswordView(
      this.changePasswordForm.value.currentPassword,
      this.changePasswordForm.value.newPassword,
      this.changePasswordForm.value.confirmPassword
    );
    this.store.dispatch(UserActions.changePassword({ payload: cpModel }));
  }

}
