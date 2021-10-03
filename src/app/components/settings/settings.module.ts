import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/authentication/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ConstantsSettingsComponent } from './constants-settings/constants-settings.component';
import { LoanSettingsComponent } from './loan-settings/loan-settings.component';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: SettingsComponent, canActivate: [AuthGuard], children: [
            {
                path: '',
                children: [
                    { path: '', component: LoanSettingsComponent },
                    { path: 'loan', component: LoanSettingsComponent },
                    { path: 'constants', component: ConstantsSettingsComponent },
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedModule, FormsModule, CommonModule],
    entryComponents: [  LoanSettingsComponent],
    declarations: [
        LoanSettingsComponent,
        ConstantsSettingsComponent,
    ],
    exports: [
    ],
    providers: []
})
export class SettingsModule { }
