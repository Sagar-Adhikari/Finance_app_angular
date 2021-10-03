
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  constructor(private baseService: BaseService) { }

  getMembersForTransaction() {
    var url = environment.reportingApiUrl + "/members/getMembersTransactionView";
    return this.baseService.get(url, { });
  }

  getNewMemberId( ) {
    var url = environment.reportingApiUrl + "/members/getNewMemberId"
    return this.baseService.get(url, {});
 }


}
