import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { LoanSettingsModel, TblSngRegModel } from 'src/app/models/loan-settings-model';

@Injectable({
    providedIn: "root",
})

export class SettingsService {
    constructor(private baseService: BaseService) { }

    getSettings() {
        var url = environment.reportingApiUrl + "/settings/getSettings";
        return this.baseService.get(url, {});
    }

    updateSettings(settings: TblSngRegModel[]) {
        var url = environment.reportingApiUrl + "/settings/updateSettings";
        return this.baseService.post(url, {}, settings);
    }

    getNepaliDate() {
        console.log('service getNepaliDate called,...');
        var url = environment.reportingApiUrl + "/common/getNepaliDate";
        return this.baseService.get(url, {},);
    }
}