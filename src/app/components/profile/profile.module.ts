import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { UserService } from 'src/app/core/services/user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard], },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule],
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,    
  ],
  exports: [
  ],
  providers: [UserService]
})
export class ProfileModule { }