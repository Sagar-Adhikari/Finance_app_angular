import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { AuthUser } from 'src/app/models/authuser.model';

@Injectable()
export class AuthGuard implements CanActivate {
  private authUser: AuthUser;

  constructor(private router: Router, private store: Store<AppState>) { 
    this.store.select(p => p.user).subscribe(us => {
      this.authUser = us.user;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authUser != null) { return true; }
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}