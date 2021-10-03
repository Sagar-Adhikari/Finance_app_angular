import { CommonService } from "src/app/core/services/common.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tole",
  templateUrl: "./tole.component.html",
  styleUrls: ["./tole.component.css"],
})
export class ToleComponent implements OnInit {
  toleList: any[] = [];
  tole: string;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getTole().subscribe((x: any) => {
      this.toleList = x;
    });
  }
}
