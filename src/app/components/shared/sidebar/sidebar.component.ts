import { GlobalService } from 'src/app/global.service';
import {
  Component,
  OnInit,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Store } from "@ngrx/store";
import { NavItem } from 'src/app/models/nav_item';
import { NavService } from 'src/app/providers/side-nav.service';
import { AppState } from 'src/app/state/app.state';
import { AuthUser } from 'src/app/models/authuser.model';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';


const SMALL_DEVICES = 720;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  animations: [
    trigger('changeSideNavWidth', [
      state('initial', style({
        width: '70px',
      })),
      state('final', style({
        width: '240px',
      })),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('200ms'))
    ]),
  ]

})
export class SidebarComponent implements OnInit {

  isLoadingData: boolean = false;
  navItems: NavItem[];
  appName: String;
  isExpanded: boolean = false;
  currentSizeNavState = 'initial';
  smallScreen = false;
  allowFooter =true;

  constructor(
    private navService: NavService,
    private store: Store<AppState>,
    private globalService:GlobalService
  ) {
    this.globalService.pageTitle$.subscribe(x => {
      // this.pageTitle = x.pageTitle;
      this.allowFooter = x.allowFooter;
    });
    this.appName = environment.siteName;

  }

  ngOnInit() { }

  @ViewChild("drawer") sidebar: ElementRef;

  ngAfterViewInit() {
    this.navService.appDrawer = this.sidebar;
    this.navService.onItemSelected = () => {
      this.isExpanded = false;
      this.currentSizeNavState = 'initial';
    };

  }

  changeAnimationState() {
    this.currentSizeNavState = this.currentSizeNavState === 'initial' ? 'final' : 'initial';
  }
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet.isActivated ? outlet.activatedRoute : '';
  // }


}
