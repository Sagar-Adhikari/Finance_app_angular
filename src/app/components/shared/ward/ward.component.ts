import { CommonService } from "src/app/core/services/common.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ward",
  templateUrl: "./ward.component.html",
  styleUrls: ["./ward.component.css"],
})
export class WardComponent implements OnInit {
  wardList: any[] = [];
  ward: string;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getWards().subscribe((x: any) => {
      this.wardList = x;
    });
  }
}
