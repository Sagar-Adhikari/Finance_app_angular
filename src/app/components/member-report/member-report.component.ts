import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberFilterData, MemberReportView, TinpusteReportView } from 'src/app/models/member.model';
import { ReportService } from "src/app/core/services/report.service";
import { SortOrderEnum, MemberFilterSortFieldsEnum, LanguageEnum } from 'src/app/models/enum_collection';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';


@Component({
  selector: "app-member-report",
  templateUrl: "./member-report.component.html",
  styleUrls: ["./member-report.component.css"],
})
export class MemberReportComponent implements OnInit {
  @ViewChild("gender") genderRef;
  @ViewChild("caste") casteRef;
  @ViewChild("category") categoryRef;
  @ViewChild("samuha") samuhaRef;
  @ViewChild("account") accountRef;
  @ViewChild("district") districtRef;
  @ViewChild("vdc") vdcRef;
  @ViewChild("ward") wardRef;
  @ViewChild("tole") toleRef;
  @ViewChild("jati") jatiRef;
  @ViewChild("antGroup") antGroupRef;

  public filterData: MemberFilterData = new MemberFilterData();

  public accounts: any[];

  showFilter = true;
  showTable = false;
  ticketNo: string;
  loading: boolean;
  sortOrder: string;
  selectedLanguage: string;
  balSelected: false;

  constructor(private store: Store<AppState>, private reportService: ReportService, private snackBar: MatSnackBar,private globalService:GlobalService) {
    this.globalService.setLayout({pageTitle:'Member Report',allowFooter:false});

    this.store.select(state => state.settings)
      .subscribe(
        settingsState => {
          if (settingsState.nepaliDate != null) {
            var dt = new Date(settingsState.nepaliDate);
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;//js getMonth month begins from 0.
            var day = dt.getDate();

            this.filterData.fromDate = year + '/01/01';
            this.filterData.toDate = year + '/' + month.toString().padStart(2, '0') + '/' + day.toString().padStart(2, '0');
          }
        }

      );
   }

  public memberReport: MemberReportView;
  public tinPusteReport: TinpusteReportView;

  ngOnInit(): void {
    this.sortOrder = 'asc';
    this.selectedLanguage = 'nepali';
  }

  searchTinPuste() {
    this.filterData.searchForTinpuste = true;
    this.applyFilter();
    this.getTinpuste();
  }

  searchMembers() {
    this.filterData.searchForTinpuste = false;
    this.applyFilter();
    this.getMembers();
  }

  applyFilter() {
    this.filterData.caste = this.casteRef.selectedCaste;
    this.filterData.district = this.districtRef.district;
    this.filterData.vdc = this.vdcRef.vdc;
    this.filterData.ward = this.wardRef.ward;
    this.filterData.tole = this.toleRef.tole;
    this.filterData.balSelected = this.balSelected;

    this.filterData.membersCreatedSelected = true;//todo:? is this needed

    this.filterData.genderId = (this.genderRef.selectedGender == undefined)
    ? -1 : this.genderRef.selectedGender.gendID;

    this.filterData.upID = (this.categoryRef.selectedCategory == undefined)
    ? -1 : this.categoryRef.selectedCategory.upID;

    this.filterData.antGrpID = (this.antGroupRef.selectedAntGroup == undefined)
    ? -1 : this.antGroupRef.selectedAntGroup.antGrpID;

    this.filterData.subAccountId = (this.accountRef.selectedSubAccount == undefined)
    ? -1 : this.accountRef.selectedSubAccount.accSN;

    this.filterData.jatiId = (this.jatiRef.jati == undefined)
    ? -1 : this.jatiRef.jati.jatiId;

    this.filterData.sortOrder = this.sortOrder == 'asc' ? SortOrderEnum.Asc : SortOrderEnum.Desc;
    this.filterData.selectedLanguage = this.selectedLanguage == 'english' ? LanguageEnum.English : LanguageEnum.Nepali;

    this.filterData.sortBy = MemberFilterSortFieldsEnum.MemID;//todo:
  }

  getMembers() {
    //call services to fetch api here sending filter parameters.
    this.loading = true;
    this.tinPusteReport = null;
    this.reportService.getMemberReport(this.filterData).subscribe((mR: any) => {
      this.loading = false;
      this.showFilter = false;
      this.memberReport = mR as MemberReportView;
    },(err) => {this._handleError(err)});
  }

  getTinpuste() {
    //call services to fetch api here sending filter parameters.
    this.loading = true;
    this.memberReport = null;
    this.reportService.getTinpusteReport(this.filterData).subscribe((tR: any) => {
      this.loading = false;
      this.showFilter = false;
      this.tinPusteReport = tR as TinpusteReportView;
      console.log(this.tinPusteReport);
    },(err) => {this._handleError(err)});
  }

  _handleError(err: any) {
    console.log(err);
    this.loading = false;
    this.snackBar.open("Unable to perform search at this time.", "", {
      duration: 2000,
      panelClass: 'error-message'
    });
  }
}
