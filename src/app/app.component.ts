import { fader } from './tools/slide-panel/animation';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProgressIndicatiorService } from './providers/progress-indicator.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/actions/user.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader]
})
export class AppComponent {
  appName: string;
  showLoading: boolean = false;

  constructor(private store: Store<AppState>,
    private progressIndicatorService: ProgressIndicatiorService,
    public oidcSecurityService: OidcSecurityService,) {
    this.appName = environment.siteName;
    progressIndicatorService.showIndicator.subscribe(value => {
      this.showLoading = value;
    });
  }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((auth) => {
      if (auth) {
        this.store.dispatch(UserActions.login());
      }
    });
  }
}
