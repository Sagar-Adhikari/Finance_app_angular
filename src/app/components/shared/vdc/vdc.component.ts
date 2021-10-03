import { CommonService } from "src/app/core/services/common.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-vdc",
  templateUrl: "./vdc.component.html",
  styleUrls: ["./vdc.component.css"],
})
export class VdcComponent implements OnInit {
  vdcList: any[];
  vdc: string;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getVdcs().subscribe((x: any) => {
      this.vdcList = x;

    });
  }
}
