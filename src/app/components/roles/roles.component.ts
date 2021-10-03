import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import * as RolesActions from '../../actions/role.action';
import { roles } from 'src/app/selectors/roles.selector';
import { Role } from 'src/app/models/role';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  allRoles: Role[];

  displayedColumns: string[] = ['id', 'rolename', 'actions'];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private globalService:GlobalService
    ) {
      this.globalService.setLayout({pageTitle:'Role List',allowFooter:false});
    this.store.pipe(select(roles)).subscribe(roles => {
      this.allRoles = roles;
    });
   }

  ngOnInit(): void {
    this.store.dispatch(RolesActions.loadRoles());
  }

  addNewRole() {
    this.router.navigate(['/addnewrole']);
  }

  deleteRole(role: Role) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {

        width: '250px',
        data: {
          title: 'Are you sure?',
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === 'yes') {
          this.store.dispatch(RolesActions.deleteRole({ payload: role }));
        }
      });
  }


}
