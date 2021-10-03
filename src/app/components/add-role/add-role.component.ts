import { GlobalService } from 'src/app/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Role } from 'src/app/models/role';
import * as RolesActions from '../../actions/role.action';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {


  newRoleForm;

  constructor(private router: Router, public fb: FormBuilder, private store: Store<AppState>,private globalService:GlobalService) {
    this.newRoleForm = this.fb.group({
      rolename: ['', [Validators.required]],
    });
    this.globalService.setLayout({pageTitle:'Add Role',allowFooter:true});
  }

  ngOnInit(): void {
  }

  get newRole() {
    return new Role(
      undefined, // New Role with an undefined id
      this.newRoleForm.get('rolename').value
    );
  }

  goBack() {
    this.router.navigate(['/roles'])
  }

  submit() {
    var newRoleData = this.newRole;
    this.store.dispatch(RolesActions.createNewRole({payload: newRoleData}));
  }
}
