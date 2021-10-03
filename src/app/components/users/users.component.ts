import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { applicationUsers } from 'src/app/selectors/applicationUsers.selector';
import { ApplicationUser } from 'src/app/models/applicationUser.model';
import * as ApplicationUserActions from '../../actions/applicationUser.action';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaginationView } from 'src/app/models/api-reponse.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'username', 'roles', 'post'];
  dataSource = new MatTableDataSource<ApplicationUser>([]);

  usersData: PaginationView<ApplicationUser>;
  pageSize: number = 20;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public dialog: MatDialog,
    private globalService:GlobalService
    ) {
      this.globalService.setLayout({pageTitle:'User List',allowFooter:false});

    this.store.pipe(select(applicationUsers)).subscribe(users => {
      this.dataSource.data = users?.contents ?? [];
      this.usersData = users;
    });
   }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.store.dispatch(ApplicationUserActions.loadUsers({page: 0, limit: this.pageSize}));
  }

  fetch(page: number) {

    this.store.dispatch(ApplicationUserActions.loadUsers({ page: page, limit: this.pageSize}));
  }

  addNewUser() {
    this.router.navigate(['/addnewuser']);
  }

  editUser(user: ApplicationUser) {
    this.router.navigate(['/edituser', { user: JSON.stringify(user) }],);

  }
}
