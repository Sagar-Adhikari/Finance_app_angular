// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
// import { AuthGuard } from './core/authentication/auth.guard';
// import { UsersComponent } from './components/users/users.component';
// import { AddUserComponent } from './components/add-user/add-user.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { ChangePasswordComponent } from './components/account/change-password/change-password.component';
// import { RolesComponent } from './components/roles/roles.component';
// import { AddRoleComponent } from './components/add-role/add-role.component';

// const routes: Routes = [
//   { path: 'auth-callback', component: AuthCallbackComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
//   { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
//   { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },

//   { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
//   { path: 'addnewuser', component: AddUserComponent, canActivate: [AuthGuard]},
//   { path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
//   { path: 'addnewrole', component: AddRoleComponent, canActivate: [AuthGuard]},
//   { path: '**', redirectTo: '', pathMatch: 'full' },

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
