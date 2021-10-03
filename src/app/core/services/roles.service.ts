import { RoleTask } from './../../models/roletask.model';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private baseService: BaseService,
  ) { }

  getAllRoles() {
    var url = environment.roleManagerApiUrl + '/role/getAllRoles'
    return this.baseService.get(url, {});
  }

  createNewRole(role: Object) {
    var url = environment.roleManagerApiUrl + '/role/createNewRole'
    return this.baseService.post(url, {}, role);
  }

  deleteRole(role: Object) {
    var url = environment.roleManagerApiUrl + '/role/deleteRole'
    return this.baseService.post(url, {}, role);
  }
  getTaskForRoles(roleId: number) {
    var url = environment.roleManagerApiUrl +'/role/getTasksForRole';
    return this.baseService.get(url,  {roleId});
  }

  updateTaskListForRoles(value:RoleTask[]) {
    var url = environment.roleManagerApiUrl +'/role/updateTasksForRole';
    return this.baseService.post(url,  {},value);
  }


}
