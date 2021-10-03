import { RoleTask } from "./../../../models/roletask.model";
import { GlobalService } from "./../../../global.service";
import { ActivatedRoute } from "@angular/router";
import { RolesService } from "./../../../core/services/roles.service";
import { Component, OnInit } from "@angular/core";
import { arraysAreNotAllowedMsg } from "@ngrx/store/src/models";

@Component({
  selector: "app-role-task",
  templateUrl: "./role-task.component.html",
  styleUrls: ["./role-task.component.css"],
})
export class RoleTaskComponent implements OnInit {
  roleId: number = 0;
  areAllSelected = false;

  roleTaskList: RoleTask[];

  constructor(
    private roleService: RolesService,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {
    this.globalService.setLayout({
      pageTitle: "Task List For Role",
      allowFooter: false,
    });
  }

  toggleAllSelection() {
    this.areAllSelected = !this.areAllSelected;
    this.roleTaskList = this.roleTaskList.map((item) => ({
      ...item,
      selected: this.areAllSelected,
    }));

  }

  ngOnInit(): void {
    this.roleId = +this.route.snapshot.paramMap.get("id");
    if (this.roleId) {
      this.roleService.getTaskForRoles(this.roleId).subscribe((x) => {
        this.roleTaskList = x as RoleTask[];
      });
    }
  }
  onUpdateTaskList() {
    console.log(this.roleTaskList[0]);
    this.roleService.updateTaskListForRoles(this.roleTaskList).subscribe((x: any) => {
      if(x){
        this.globalService.showMessageSuccess('Role Task List Updated Successfully!')
      }
    });
  }
}
