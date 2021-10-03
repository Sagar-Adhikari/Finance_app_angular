import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { LoanFilterData } from 'src/app/models/loan-filter.model';

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private baseService: BaseService) { }

  getTrialBalalnce(minDate: string, maxDate: string) {
    var url = environment.reportingApiUrl + "/reports/getTrialBalance";
    return this.baseService.get(url, { "minDate": minDate, "maxDate": maxDate });
  }

  getProfitLoss(minDate: string, maxDate: string) {
    var url = environment.reportingApiUrl + "/reports/getProfitLoss";
    return this.baseService.get(url, { "minDate": minDate, "maxDate": maxDate });
  }

  getMemberReport(requestData: any) {
    var url = environment.reportingApiUrl + "/reports/getMembersReport";
    return this.baseService.post(url, {}, requestData);
  }

  getTinpusteReport(requestData: any) {
    var url = environment.reportingApiUrl + "/reports/getTinpusteReport";
    return this.baseService.post(url, {}, requestData);
  }

  getKistaOfMonth(requestData: LoanFilterData) {
    var url = environment.reportingApiUrl + "/reports/getKistaOfMonth";
    return this.baseService.post(url, {}, requestData);
  }

  getRinRakam(requestData: LoanFilterData) {
    var url = environment.reportingApiUrl + "/reports/getRinRakam";
    return this.baseService.post(url, {}, requestData);
  }

  getRinTerijs(requestData: LoanFilterData) {
    var url = environment.reportingApiUrl + "/reports/getRinTerij";
    return this.baseService.post(url, {}, requestData);
  }
  getLoanDeposit(tsn:number) {
    var url = environment.reportingApiUrl + "/Transaction/getBillTransactionReport/";
    return this.baseService.get(url,{tsn});
  }

  getDayVoucher() {
    var url = environment.reportingApiUrl + "/reports/getDayVoucher";
    return this.baseService.get(url,{ });
  }

}
