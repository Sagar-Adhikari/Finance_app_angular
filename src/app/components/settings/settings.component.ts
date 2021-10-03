import { GlobalService } from "src/app/global.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/state/app.state";
import * as SettingsActions from "../../actions/pw-settings.action";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private globalService: GlobalService
  ) {
    this.globalService.setLayout({
      pageTitle: "App Setting",
      allowFooter: false,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.getSettings());
  }
}
