import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private baseService: BaseService) { }

  getGenders() {
    var url = environment.reportingApiUrl + "/common/getGenders";
    return this.baseService.get(url, {});
  }

  getCastes() {
    var url = environment.reportingApiUrl + "/common/getCastes";
    return this.baseService.get(url, {});
  }

  getJatis() {
    let url = environment.reportingApiUrl + "/common/getJatis";
    return this.baseService.get(url, {});
  }

  getMemberCategories() {
    var url = environment.reportingApiUrl + "/common/getMemberCategories";
    return this.baseService.get(url, {});
  }

  getAngGrps() {
    var url = environment.reportingApiUrl + "/common/getAngGrps";
    return this.baseService.get(url, {});
  }

  getAllGrps() {
    var url = environment.reportingApiUrl + "/common/getAngGrps";
    return this.baseService.get(url, {});
  }

  getAccounts() {
    var url = environment.reportingApiUrl + "/common/getAccounts";
    return this.baseService.get(url, {});
  }

  getParticulars() {
    var url = environment.reportingApiUrl + "/common/getParticulars";
    return this.baseService.get(url, {});
  }

  getSubAccounts() {
    var url = environment.reportingApiUrl + "/common/getSubAccounts";
    return this.baseService.get(url, {});
  }

  getAllDistricts() {
    var url = environment.reportingApiUrl + "/common/getDistricts";
    return this.baseService.get(url, {});
  }
  getVdcs() {
    var url = environment.reportingApiUrl + "/common/getVdcs";
    return this.baseService.get(url, {});
  }
  getWards() {
    var url = environment.reportingApiUrl + "/common/getWards";
    return this.baseService.get(url, {});
  }
  getTole() {
    var url = environment.reportingApiUrl + "/common/getToles";
    return this.baseService.get(url, {});
  }
  getShakhas() {
    var url = environment.reportingApiUrl + "/common/getShakhas";
    return this.baseService.get(url, {});
  }

  getTotalMeemberCountByGender() {
    var url = environment.reportingApiUrl + "/common/getTotalMembersCountByGender";
    return this.baseService.get(url, {});
  }

  getTotalOfCurrentBankAccount(){
    var url = environment.reportingApiUrl + "/common/getTotalOfCurrentBankAccounts";
    return this.baseService.get(url, {});
  }

  getTotalTodaysCashINCashOUT(){
    var url = environment.reportingApiUrl + "/common/getTotalTodaysCashINCashOut";
    return this.baseService.get(url, {});
  }

}
