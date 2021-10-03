import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoanFilterData, LoanReportFor, KistaReportView, RinRakamReportView, RinTerijReportView } from 'src/app/models/loan-filter.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from 'src/app/core/services/report.service';
import { LanguageEnum } from 'src/app/models/enum_collection';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.component.html',
  styleUrls: ['./loan-report.component.css']
})
export class LoanReportComponent implements OnInit {

  @ViewChild("gender") genderRef;
  @ViewChild("district") districtRef;
  @ViewChild("vdc") vdcRef;
  @ViewChild("ward") wardRef;
  @ViewChild("tole") toleRef;
  @ViewChild("jati") jatiRef;
  @ViewChild("antGroup") antGroupRef;

  public filterData: LoanFilterData = new LoanFilterData();


  showFilter = true;
  showTable = false;
  loading: boolean;
  selectedLanguage: string;

  public kistaReport: KistaReportView;
  public rinRakamReport: RinRakamReportView;
  public rinTerijReport: RinTerijReportView;

  constructor(private reportService: ReportService, private snackBar: MatSnackBar,private globalService:GlobalService ) {
    this.globalService.setLayout({pageTitle:'Loan Report',allowFooter:false});
   }

  ngOnInit(): void {
    this.selectedLanguage = 'nepali';
  }

  kistaOfThisMonth() {
    this.applyFilter(LoanReportFor.kista);
    this._getKista();
  }

  rinRakam() {
    this.applyFilter(LoanReportFor.kista);
    this._getRinRakam();
  }

  rinTerij() {
    this.applyFilter(LoanReportFor.kista);
    this._getRinTerij();
  }

  applyFilter(reportFor: LoanReportFor) {
    this.filterData.district = this.districtRef.district;
    this.filterData.vdc = this.vdcRef.vdc;
    this.filterData.ward = this.wardRef.ward;
    this.filterData.tole = this.toleRef.tole;

    this.filterData.genderId = (this.genderRef.selectedGender == undefined)
      ? -1 : this.genderRef.selectedGender.gendID;

    this.filterData.antGrpID = (this.antGroupRef.selectedAntGroup == undefined)
      ? -1 : this.antGroupRef.selectedAntGroup.antGrpID;


    this.filterData.jatiId = (this.jatiRef.jati == undefined)
      ? -1 : this.jatiRef.jati.jatiId;

    this.filterData.reportFor = reportFor;

    this.filterData.selectedLanguage = this.selectedLanguage == 'english' ? LanguageEnum.English : LanguageEnum.Nepali;
  }

  _getKista() {

    this.loading = true;
    this.rinRakamReport = null;
    this.rinTerijReport = null;
    this.reportService.getKistaOfMonth(this.filterData).subscribe((tR: any) => {
      this.loading = false;
      this.showFilter = false;
      this.kistaReport = tR as KistaReportView;
    }, (err) => { this._handleError(err) });
  }

  _getRinRakam() {

    this.loading = true;
    this.kistaReport = null;
    this.rinTerijReport = null;
    this.reportService.getRinRakam(this.filterData).subscribe((tR: any) => {
      this.loading = false;
      this.showFilter = false;
      console.log(tR);
      this.rinRakamReport = tR as RinRakamReportView;
    }, (err) => { this._handleError(err) });
  }

  _getRinTerij() {

    this.loading = true;
    this.kistaReport = null;
    this.rinRakamReport = null;
    this.reportService.getRinTerijs(this.filterData).subscribe((tR: any) => {
      this.loading = false;
      this.showFilter = false;
      console.log(tR);
      this.rinTerijReport = tR as RinTerijReportView;
    }, (err) => { this._handleError(err) });
  }

  _handleError(err: any) {
    console.log('error!');
    console.log(err);
    this.loading = false;
    this.snackBar.open("Unable to perform search at this time.", "", {
      duration: 2000,
      panelClass: 'error-message'
    });
  }

}
