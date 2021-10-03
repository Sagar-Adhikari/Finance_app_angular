import { Jati } from './../../../models/jati.model';
import { CommonService } from "src/app/core/services/common.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-jati-selector",
  templateUrl: "./jati-selector.component.html",
  styleUrls: ["./jati-selector.component.css"],
})
export class JatiSelectorComponent implements OnInit {
  public jati: Jati;
  public jatiList: Jati[];
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getJatis().subscribe((x) => {
      this.jatiList = x as Jati[];
    });

  }
}
