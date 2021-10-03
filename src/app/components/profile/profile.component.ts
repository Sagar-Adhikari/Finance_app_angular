import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthUser } from 'src/app/models/authuser.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: AuthUser;

  constructor(private store: Store<AppState>,private globalService:GlobalService) {
    this.globalService.setLayout({pageTitle:'Profile',allowFooter:false});
    store.select(state => state.user)
      .subscribe(
        userState => {
          if (userState.user != null) {
            this.user = userState.user;
          }
        }
      );
  }

  ngOnInit(): void {
  }

}
