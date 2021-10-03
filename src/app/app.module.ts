import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { CoreModule } from './core/core.module';
import { NavService } from './providers/side-nav.service';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenuListItemComponent } from './components/shared/sidebar/menu-list-item/menu-list-item.component';
import { UsersComponent } from './components/users/users.component';
import { ApplicationUsersEffects } from './effects/applicationUsers.effects';
import { AddUserComponent } from './components/add-user/add-user.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { RolesComponent } from './components/roles/roles.component';
import { RolesEffects } from './effects/roles.effect';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './components/profile/profile.module';
import { SettingsModule } from './components/settings/settings.module';
import { ProgressIndicatiorService } from './providers/progress-indicator.service';
import { ProgressIndicatorComponent } from './components/shared/progress-indicator/progress-indicator.component';
import { TrialBalanceComponent } from './components/reports/trial-balance/trial-balance.component';
import { ProfitlossComponent } from './components/profitloss/profitloss.component';
import { MemberReportComponent } from './components/member-report/member-report.component';
import { GenderSelectorComponent } from './components/shared/gender-selector/gender-selector.component';
import { CasteSelectorComponent } from './components/shared/caste-selector/caste-selector.component';
import { MemberCategorySelectorComponent } from './components/shared/member-category-selector/member-category-selector.component';
import { DistrictComponent } from './components/shared/district/district.component';
import { VdcComponent } from './components/shared/vdc/vdc.component';
import { WardComponent } from './components/shared/ward/ward.component';
import { ToleComponent } from './components/shared/tole/tole.component';
import { GroupSelectorComponent } from './components/shared/group-selector/group-selector.component';
import { SubAccountSelectorComponent } from './components/shared/sub-account-selector/sub-account-selector.component';
import { JatiSelectorComponent } from './components/shared/jati-selector/jati-selector.component';
import { AllGroupComponent } from './components/shared/all-group/all-group.component';
import { MemberReportViewComponent } from './components/member-report-view/member-report-view.component';
import { TinPusteComponent } from './components/tin-puste/tin-puste.component';
import { ReportHeaderComponent } from './components/shared/report-header/report-header.component';
import { LoanReportComponent } from './components/reports/loan-report/loan-report.component';
import { KistaReportComponent } from './components/reports/loan-report/kista-report/kista-report.component';
import { RinRakamComponent } from './components/reports/loan-report/rin-rakam/rin-rakam.component';
import { RinTerijComponent } from './components/reports/loan-report/rin-terij/rin-terij.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PwSettingsEffects } from './effects/pw-settings.effects';
import { ShakhaSelectorComponent } from './components/shared/shakha-selector/shakha-selector.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { RoleTaskComponent } from './components/roles/role-task/role-task.component';
import { SlidePanelComponent } from './tools/slide-panel/slide-panel.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AccountSelectorComponent } from './components/shared/account-selector/account-selector.component';
import { ParticularSelectorComponent } from './components/shared/particular-selector/particular-selector.component';
import { NewSubAccountComponent } from './components/new-sub-account/new-sub-account.component';
import { NewParticularComponent } from './components/new-particular/new-particular.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { OccupationInfoComponent } from './components/new-member/occupation-info/occupation-info.component';
import { CooperativeAccountInfoComponent } from './components/new-member/cooperative-account-info/cooperative-account-info.component';
import { NomineeInfoComponent } from './components/new-member/nominee-info/nominee-info.component';
import { IncomeInfoComponent } from './components/new-member/income-info/income-info.component';
import { PersonalInfoComponent } from './components/new-member/personal-info/personal-info.component';
import { FamilyInfoComponent } from './components/new-member/family-info/family-info.component';
import { AddressInfoComponent } from './components/new-member/address-info/address-info.component';
import { ImageUploadComponent } from './components/shared/image-upload/image-upload.component';
import { ImageCropperModule } from 'ngx-image-cropper';
// import { UploadImageComponent } from './components/shared/upload-image/upload-image.component';
import { LedgerReportComponent } from './components/transaction/ledger-report/ledger-report.component';
import { DepositSlipComponent } from './components/transaction/deposit-slip/deposit-slip.component';
import { NgxPrintModule } from 'ngx-print';
import { UserTaskComponent } from './components/users/user-task/user-task.component';
import { SubAccountDdComponent } from './components/shared/sub-account-dd/sub-account-dd.component';
import { CurrentBankTotalDialogComponent } from './components/dashboard/current-bank-total-dialog/current-bank-total-dialog.component';
import { DailyVoucherComponent } from './components/reports/daily-voucher/daily-voucher.component';
import { ShakhaSwitcherComponent } from './components/shared/toolbar/shakha-switcher/shakha-switcher.component';
import { AuthModule, OidcConfigService, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { ActivityMonitorDashComponent } from './components/dashboard/activity-monitor-dash/activity-monitor-dash.component';
import { AddNewMemberComponent } from './components/new-member/add-new-member/add-new-member.component';


export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: environment.authority,
      redirectUrl:  environment.redirect_uri,
      postLogoutRedirectUri: environment.redirect_uri,
      clientId: environment.client_id,
      scope: environment.scope,
      responseType: environment.response_type,
      silentRenew: false,
      logLevel: LogLevel.None,
    });
}

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], redirectTo: '/dashboard' },

  { path: 'user-profile', loadChildren: './components/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], },
  { path: 'addnewuser', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'edituser', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'roles/:id', component: RoleTaskComponent, canActivate: [AuthGuard] },

  { path: 'addnewrole', component: AddRoleComponent, canActivate: [AuthGuard] },
  { path: 'trialbalance', component: TrialBalanceComponent, canActivate: [AuthGuard] },
  { path: 'profitloss', component: ProfitlossComponent, canActivate: [AuthGuard] },
  { path: 'member-report', component: MemberReportComponent, canActivate: [AuthGuard] },
  { path: 'loan-report', component: LoanReportComponent, canActivate: [AuthGuard] },
  { path: 'loan-deposit', component: DepositSlipComponent, canActivate: [AuthGuard] },
  { path: 'daily-voucher', component: DailyVoucherComponent, canActivate: [AuthGuard] },



  {
    path: 'app-settings',
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },

  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'addnewtask', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'editTask', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },

  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    MenuListItemComponent,
    DashboardComponent,
    ToolbarComponent,
    UsersComponent,
    AddUserComponent,
    RolesComponent,
    AddRoleComponent,
    ConfirmDialogComponent,
    ProgressIndicatorComponent,
    TrialBalanceComponent,
    ProfitlossComponent,
    MemberReportComponent,
    GenderSelectorComponent,
    CasteSelectorComponent,
    MemberCategorySelectorComponent,
    DistrictComponent,
    VdcComponent,
    WardComponent,
    ToleComponent,
    GroupSelectorComponent,
    SubAccountSelectorComponent,
    JatiSelectorComponent,
    AllGroupComponent,
    MemberReportViewComponent,
    TinPusteComponent,
    ReportHeaderComponent,
    LoanReportComponent,
    KistaReportComponent,
    RinRakamComponent,
    RinTerijComponent,
    SettingsComponent,
    ShakhaSelectorComponent,
    TaskComponent,
    AddTaskComponent,
    TaskDetailComponent,
    RoleTaskComponent,
    SlidePanelComponent,
    TransactionComponent,
    AccountSelectorComponent,
    ParticularSelectorComponent,
    NewSubAccountComponent,
    NewParticularComponent,
    NewMemberComponent,
    OccupationInfoComponent,
    CooperativeAccountInfoComponent,
    NomineeInfoComponent,
    IncomeInfoComponent,
    PersonalInfoComponent,
    FamilyInfoComponent,
    AddressInfoComponent,

    // UploadImageComponent,
    LedgerReportComponent,
    ImageUploadComponent,
    DepositSlipComponent,
    UserTaskComponent,
    SubAccountDdComponent,
    CurrentBankTotalDialogComponent,
    DailyVoucherComponent,
    ShakhaSwitcherComponent,
    ActivityMonitorDashComponent,
    AddNewMemberComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes,{ useHash:true, onSameUrlNavigation: 'reload'}),
    HttpClientModule,
    FlexLayoutModule,
    ImageCropperModule,
    // AccountModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([UserEffects, ApplicationUsersEffects, RolesEffects, PwSettingsEffects]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,

    SharedModule,
    ImageCropperModule,
    NgxPrintModule,
    AuthModule.forRoot(),
  ],
  exports: [
    NgxPrintModule
  ],
  providers: [
    NavService,
    ProgressIndicatiorService,
    OidcConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configureAuth,
        deps: [OidcConfigService],
        multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
