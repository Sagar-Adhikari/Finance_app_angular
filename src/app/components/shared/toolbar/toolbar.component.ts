import { NavItem } from 'src/app/models/nav_item';
import { GlobalService } from "./../../../global.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AppState } from "src/app/state/app.state";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthUser } from "src/app/models/authuser.model";
import { environment } from "src/environments/environment";
import { ProgressIndicatiorService } from "src/app/providers/progress-indicator.service";
import * as UserActions from 'src/app/actions/user.action';
import { CommonService } from 'src/app/core/services/common.service';
import { TblShakhaModel, SelectedShakhaModel } from 'src/app/models/shakha-model';
import { MatDialog } from '@angular/material/dialog';
import { ShakhaSwitcherComponent } from './shakha-switcher/shakha-switcher.component';
import { OidcSecurityService, PublicEventsService, EventTypes } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  isAuthorized: Boolean;
  user: AuthUser;
  accessToken: string;
  appName: string;
  pageTitle = "Home";
  allowFooter = true;
  loading = false;

  selectedShakhaModel: SelectedShakhaModel;

  navItems: NavItem[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private globalService: GlobalService,
    private commonService: CommonService,
    public dialog: MatDialog,
    public oidcSecurityService: OidcSecurityService,
  ) {
    this.appName = environment.siteName;
    store
      .select((state) => state.settings)
      .subscribe((settingsState) => {
        this.selectedShakhaModel = settingsState.selectedShakha;
      });

    store
      .select((state) => state.user)
      .subscribe((userState) => {
        if (userState.user != null) {
          this.isAuthorized = true;
          this.user = userState.user;

          this._createNavForUser(userState.user);
        } else {
          this._createNavForNoSession();
        }
      });

    this.globalService.pageTitle$.subscribe((x) => {
      this.pageTitle = x.pageTitle;
      this.allowFooter = x.allowFooter;
    });
    this.globalService.loading$.subscribe((x) => {
      this.loading = x;
    });
  }

  @Output() toggleSidenav = new EventEmitter();

  ngOnInit() {
  }


  _createNavForNoSession() {
    this.navItems = [
      {
        displayName: "Getting Started",
        route: "getting-started",
        iconName: 'home',
      }
    ];
  }

  _createNavForUser(user: AuthUser) {
    //todo: check user roles here...
    this.navItems = [
      {
        displayName: "Dashboard",
        route: "dashboard",
        iconName: 'home',
      },

      {
        displayName: "Authentications",
        iconName: 'account_balance',
        children: [

          {
            displayName: "Roles",
            route: "roles",
            iconName: 'person_outline',

          },
          {
            displayName: "Tasks",
            route: "task",
            iconName: 'assignment',

          },
          {
            displayName: "Users",
            route: "users",
            iconName: 'people_outline',
          },
        ]
      },



      {
        displayName: "Transactions",
        route: "transaction",
        iconName: 'bubble_chart',
      },
      {
        displayName: "Reports",
        iconName: 'report_problem',
        children: [
          {
            displayName: "Final Reports",
            children: [
              {
                displayName: "Trial Balance",
                route: "trialbalance"
              },
              {
                displayName: "Profit Loss",
                route: "profitloss"
              },
              {
                displayName: "Member Report",
                route: "member-report"
              },
            ]
          },
          {
            displayName: "Loan Reports",
            route: "loan-report"
          },
          {
            displayName: 'Daily Reports',
            route: "daily-voucher"
          },
          {
            displayName: 'Other Reports',
            route: ""
          },

        ]
      },
    ];
  }

  accoountLinkClicked() {
    this.router.navigate(["/user-profile"]);
  }

  settingsLinkClicked() {
    this.router.navigate(["/app-settings"]);
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
    this.store.dispatch(UserActions.logOut());
  }

  switchShakhaClicked() {
    if (this.user == null || this.user.shakhaId != 0) return;
    this.dialog.open(ShakhaSwitcherComponent,
      {
        disableClose: false,
      });
  }
}
