import { Component, OnInit } from "@angular/core";
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: "app-district",
  templateUrl: "./district.component.html",
  styleUrls: ["./district.component.css"],
})
export class DistrictComponent implements OnInit {
  districtList: any[] = [];
  public district: string;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getAllDistricts().subscribe((x: any) => {
      this.districtList = x;
    });
  }
}
