import { DailyVoucher, DayVoucher } from "./../../../models/daily-voucher";
import { GlobalService } from "src/app/global.service";
import { ReportService } from "src/app/core/services/report.service";
import { Component, OnInit } from "@angular/core";
import DailyVoucherCss from "./daily-voucher.component.css";

@Component({
  selector: "app-daily-voucher",
  templateUrl: "./daily-voucher.component.html",
  styleUrls: ["./daily-voucher.component.css"],
})
export class DailyVoucherComponent implements OnInit {
  public dailyVoucher: DailyVoucher;
  public maxLength: number = 0;
  public totalDrAmt: number = 0;
  public totalCrAmt: number = 0;

  private loading: boolean = true;

  constructor(
    private reportService: ReportService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.globalService.setLayout({
      pageTitle: "Daily Voucher",
      allowFooter: false,
    });
    this.reportService.getDayVoucher().subscribe((x) => {
      var dV = x as DailyVoucher;
      this.dailyVoucher = new DailyVoucher(
        dV.header,
        dV.chequeNumbers,
        dV.dayVouchers
      );

      this.calculateTotal();
      this.loading = false;
    });
  }
  calculateTotal() {
    // debugger;
    let length ;
    let sumCr=0;
    let sumDr=0;
    length = Object.keys(this.dailyVoucher.dayVouchers).length;
    for (let i:number = 0; i <length; i++ ) {
       sumCr = sumCr  + this.dailyVoucher.dayVouchers[i].crAmt;
       sumDr= sumDr + this.dailyVoucher.dayVouchers[i].drAmt;
    }
    this.totalCrAmt=sumCr;
    this.totalDrAmt=sumDr;


  }
  onPrintClicked(){
    this.globalService.printDocument(DailyVoucherCss);
  }
}
