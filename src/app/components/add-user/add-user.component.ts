import { GlobalService } from 'src/app/global.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from "@angular/forms";
import { NewUser, userDetail } from "src/app/models/newUser.model";
import { AppState } from "src/app/state/app.state";
import { Store, select } from "@ngrx/store";
import * as ApplicationUserActions from "../../actions/applicationUser.action";
import { roles } from "src/app/selectors/roles.selector";
import { Role } from "src/app/models/role";
import * as RolesActions from "../../actions/role.action";
import { ApplicationUser } from "src/app/models/applicationUser.model";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  public allRoles: Role[];
  private selectedRoles: string[] = []; // Roles of user whose profile is being edited.

  existingUser: ApplicationUser;

  @ViewChild("shakha") shakhaRef;

  newUserForm;

  edit: boolean = false;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private globalService:GlobalService
  ) {

    this.globalService.setLayout({pageTitle:'Add User ',allowFooter:false});
    this.store.pipe(select(roles)).subscribe((allRoles) => {
         if (
        allRoles != null &&
        allRoles.length > 0 &&
        this.newUserForm !== undefined
      ) {
        this.allRoles = allRoles;
        this.addCheckboxes();
      }
    });
    this.newUserForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      post: ["", [Validators.required]],
      roles: new FormArray([]),
    });

    this.checkExistingUser();
  }

  private addCheckboxes() {
    if (this.allRoles == undefined || this.allRoles.length == 0) return;
    while (this.newUserForm.controls.roles.length > 0) {
      this.newUserForm.controls.roles.pop();
    }
    this.allRoles.forEach((o, i) => {
          const control = new FormControl(this.selectedRoles.includes(o.name));
      (this.newUserForm.controls.roles as FormArray).push(control);
    });
  }

  private checkExistingUser() {
    this.route.paramMap.subscribe((params) => {
      var existingUser = JSON.parse(params.get("user")) as ApplicationUser;
      if (existingUser == null || this.newUserForm == undefined) return;
      this.existingUser = existingUser;
      this.edit = true;
      this.newUserForm.controls["firstname"].setValue(existingUser.firstName);
      this.newUserForm.controls["lastname"].setValue(existingUser.lastName);
      this.newUserForm.controls["username"].setValue(existingUser.username);

      this.selectedRoles = existingUser.roles;
      this.addCheckboxes();
      this.newUserForm.controls["password"].clearValidators();
      this.newUserForm.controls["userDetail"].setValue(existingUser.userDetail);

    });
  }

  ngOnInit(): void {

    this.checkExistingUser();

    this.store.dispatch(RolesActions.loadRoles());
  }

  newUser(): NewUser {
    var roleNames: string[] = [];

    this.newUserForm.value.roles.map((checked, i) =>
      checked ? roleNames.push(this.allRoles[i].name) : null
    );

    var shakhaId = (this.shakhaRef.shakha == undefined)
    ? -1 : this.shakhaRef.shakha.shakhaID;

    return new NewUser(
      this.newUserForm.get("username").value,
      roleNames,
      this.newUserForm.get("firstname").value,
      this.newUserForm.get("lastname").value,
      this.newUserForm.get("password").value,
      this.newUserForm.get("post").value,
      shakhaId
    );
  }

  goBack() {
    this.router.navigate(["/users"]);
  }

  submit() {
    var newUserData = this.newUser();
    if(newUserData.shakhaId == undefined || newUserData.shakhaId == -1) {
      this.globalService.showMessageError("Select a valid Shakha first.");
      return;
    }
    if (this.edit) {
      this.store.dispatch(
        ApplicationUserActions.updateUser({
          payload: newUserData,
          id: this.existingUser.id,
        })
      );
    } else {
      this.store.dispatch(
        ApplicationUserActions.createNewUser({ payload: newUserData })
      );

    }
  }
}
